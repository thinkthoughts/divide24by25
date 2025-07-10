// test/fractal-math/GeometricPenalty.test.js
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Geometric Penalty System", () => {
  async function deployFixture() {
    const [owner, violator] = await ethers.getSigners();
    
    const PenaltyEscalator = await ethers.getContractFactory("PenaltyEscalator");
    const MockToken = await ethers.getContractFactory("ERC20Mock");
    
    const token = await MockToken.deploy("Test", "TST", owner.address, ethers.utils.parseEther("1000"));
    const escalator = await PenaltyEscalator.deploy(owner.address); // Using owner as mock checker
    
    // Fund violator
    await token.transfer(violator.address, ethers.utils.parseEther("100"));
    
    return { escalator, token, owner, violator };
  }

  describe("Fractal Penalty Progression", () => {
    it("Applies 1/25 penalty on first violation", async () => {
      const { escalator, token, violator } = await loadFixture(deployFixture);
      
      const initialBalance = await token.balanceOf(violator.address);
      await token.connect(violator).approve(escalator.address, ethers.utils.parseEther("100"));
      
      await expect(escalator.applyPenalty(token.address, violator.address))
        .to.changeTokenBalance(
          token, 
          violator.address, 
          -initialBalance.div(25) // 1/25 penalty
        );
    });

    it("Applies 4/25 penalty on second violation", async () => {
      const { escalator, token, violator } = await loadFixture(deployFixture);
      
      // First violation (1/25)
      await escalator.applyPenalty(token.address, violator.address);
      
      // Second violation (4/25)
      const balanceBefore = await token.balanceOf(violator.address);
      await escalator.applyPenalty(token.address, violator.address);
      
      const penalty = balanceBefore.mul(4).div(25);
      expect(await token.balanceOf(violator.address)).to.equal(balanceBefore.sub(penalty));
    });

    it("Liquidates 25/25 on third violation", async () => {
      const { escalator, token, violator } = await loadFixture(deployFixture);
      
      // First two violations
      await escalator.applyPenalty(token.address, violator.address);
      await escalator.applyPenalty(token.address, violator.address);
      
      // Third violation triggers full liquidation
      await expect(escalator.applyPenalty(token.address, violator.address))
        .to.emit(escalator, "FullLiquidation")
        .withArgs(violator.address);
      
      expect(await token.balanceOf(violator.address)).to.equal(0);
    });
  });

  describe("Fractal Precision", () => {
    it("Rounds penalties toward zero (no decimals)", async () => {
      const { escalator, token, violator } = await loadFixture(deployFixture);
      
      // Set violator balance to 7 tokens (not divisible by 25)
      await token.transfer(violator.address, 7);
      
      // 7 / 25 = 0.28 → should round to 0
      await escalator.applyPenalty(token.address, violator.address);
      expect(await token.balanceOf(violator.address)).to.equal(7);
    });

    it("Handles large values without overflow", async () => {
      const { escalator, token, violator } = await loadFixture(deployFixture);
      
      // Max uint256 / 25 should not overflow
      const maxUint = ethers.constants.MaxUint256;
      await token.transfer(violator.address, maxUint);
      
      await expect(escalator.applyPenalty(token.address, violator.address))
        .to.not.be.reverted;
    });
  });
});
