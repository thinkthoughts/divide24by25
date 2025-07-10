const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("CareCoin", () => {
  async function deployFixture() {
    const [owner, recipient] = await ethers.getSigners();
    const CareCoin = await ethers.getContractFactory("CareCoin");
    const coin = await CareCoin.deploy(owner.address);
    
    return { coin, owner, recipient };
  }

  it("Automatically sends 1/25 to care pool", async () => {
    const { coin, owner } = await loadFixture(deployFixture);
    await expect(coin.transfer(recipient.address, 2500))
      .to.changeTokenBalances(
        coin,
        [owner, recipient, await coin.carePool()],
        [-2500, 2400, 100] // 24/25 and 1/25 split
      );
  });
});
