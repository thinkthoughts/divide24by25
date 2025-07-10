const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("PenaltyEscalator", () => {
  async function deployFixture() {
    const [owner, violator] = await ethers.getSigners();
    const Checker = await ethers.getContractFactory("AntiviolentChecker");
    const Escalator = await ethers.getContractFactory("PenaltyEscalator");
    
    const checker = await Checker.deploy();
    const escalator = await Escalator.deploy(checker.address);
    
    return { escalator, checker, owner, violator };
  }

  it("Applies 1/25 penalty for first violation", async () => {
    const { escalator } = await loadFixture(deployFixture);
    await expect(escalator.applyPenalty(violator.address))
      .to.changeTokenBalance(violator, -expectedAmount / 25);
  });

  it("Liquidates after 3 violations", async () => {
    const { escalator } = await loadFixture(deployFixture);
    await escalator.applyPenalty(violator.address);
    await escalator.applyPenalty(violator.address);
    await expect(escalator.applyPenalty(violator.address))
      .to.emit(escalator, "LiquidationTriggered");
  });
});
