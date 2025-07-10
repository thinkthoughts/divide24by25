// scripts/deploy-checker.js
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // 1. Deploy AntiviolentChecker
  const Checker = await ethers.getContractFactory("AntiviolentChecker");
  const checker = await Checker.deploy();
  await checker.deployed();
  console.log(`Checker deployed to: ${checker.address}`);

  // 2. Deploy PenaltyEscalator (with Checker as dependency)
  const Escalator = await ethers.getContractFactory("PenaltyEscalator");
  const escalator = await Escalator.deploy(checker.address);
  await escalator.deployed();
  console.log(`Escalator deployed to: ${escalator.address}`);

  // 3. Save addresses to config file
  const config = {
    checker: checker.address,
    escalator: escalator.address,
    network: network.name,
    timestamp: Math.floor(Date.now() / 1000)
  };

  fs.writeFileSync(
    "./deployments/compliance.json",
    JSON.stringify(config, null, 2)
  );

  console.log("Compliance system deployed and config saved");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
