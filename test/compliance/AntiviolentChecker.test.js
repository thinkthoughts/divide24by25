const { expect } = require("chai");
const { deployMockContract } = require("ethereum-waffle");

describe("AntiviolentChecker", () => {
  let checker, careCoin, violentToken;

  before(async () => {
    const Checker = await ethers.getContractFactory("AntiviolentChecker");
    checker = await Checker.deploy();

    // Deploy mock tokens
    careCoin = await deployMockContract(await ethers.getSigner(), 
      require("../artifacts/contracts/examples/CareCoin.sol/CareCoin.json").abi
    );
    
    violentToken = await deployMockContract(await ethers.getSigner(), 
      require("../artifacts/contracts/test/mocks/ViolentTokenMock.sol/ViolentTokenMock.json").abi
    );
  });

  it("Approves 24/25 compliant contracts", async () => {
    await careCoin.mock.FRACTAL_NUMERATOR.returns(24);
    await careCoin.mock.FRACTAL_DENOMINATOR.returns(25);
    expect(await checker.verifyCompliance(careCoin.address)).to.be.true;
  });

  it("Rejects proviolent decimal tokens", async () => {
    await violentToken.mock.totalSupply.returns(ethers.utils.parseEther("1000000"));
    await expect(checker.verifyCompliance(violentToken.address))
      .to.be.revertedWith("Fractal retention violation");
  });
});
