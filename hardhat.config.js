// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("./tasks/compliance"); // Load your custom tasks

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true, // Better for fractal math verification
      optimizer: {
        enabled: true,
        runs: 24_25 // Symbolic number for 24/25 compliance
      }
    }
  },
  paths: {
    tasks: "tasks", // Custom tasks directory
    artifacts: "./artifacts", // Needed for compliance checker
    deployments: "./deployments" // For your contract addresses
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337 // Standard Hardhat network
    },
    // Add other networks (Mainnet, Polygon, etc.) as needed
  },
  mocha: {
  timeout: 60000,
  require: ["hardhat-waffle"] 
}
};
