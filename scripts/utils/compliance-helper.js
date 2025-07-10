// scripts/utils/compliance-helper.js
const { ethers } = require("hardhat");
const deployments = require("../../deployments/compliance.json");

class ComplianceHelper {
  constructor(signer) {
    this.signer = signer;
    this.checker = new ethers.Contract(
      deployments.checker,
      require("../../artifacts/contracts/compliance/AntiviolentChecker.sol/AntiviolentChecker.json").abi,
      signer
    );
    this.escalator = new ethers.Contract(
      deployments.escalator,
      require("../../artifacts/contracts/compliance/PenaltyEscalator.sol/PenaltyEscalator.json").abi,
      signer
    );
  }

  // Core Verification Functions
  async verifyContract(targetAddress) {
    const tx = await this.checker.verifyCompliance(targetAddress);
    const receipt = await tx.wait();
    return receipt.events.some(e => e.event === "ContractVerified");
  }

  async checkViolations(targetAddress) {
    return {
      count: await this.escalator.violationCounts(targetAddress),
      tier: await this._getViolationTier(targetAddress)
    };
  }

  async _getViolationTier(targetAddress) {
    const count = await this.escalator.violationCounts(targetAddress);
    return count >= 3 ? "LIQUIDATION" : 
           count === 2 ? "SEVERE" : 
           count === 1 ? "WARNING" : "CLEAN";
  }

  // Penalty Execution
  async triggerPenalty(targetAddress) {
    return this.escalator.applyPenalty(targetAddress);
  }

  // Care Pool Management
  async getCarePoolStatus() {
    return {
      verifiedCount: await this.checker.getVerifiedCount(),
      lastAudit: await this.checker.lastAuditTimestamp()
    };
  }
}

module.exports = ComplianceHelper;
