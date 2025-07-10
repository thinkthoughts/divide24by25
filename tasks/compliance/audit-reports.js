const helpers = require("./helpers");
const ComplianceHelper = require("../../scripts/utils/compliance-helper");

const generateAuditReport = async (contractAddress) => {
  const helper = new ComplianceHelper(await ethers.getSigner());
  
  return {
    timestamp: new Date().toISOString(),
    contract: contractAddress,
    fractalCompliant: await helpers.isFractalCompliant(contractAddress),
    violations: helpers.formatViolation(await helper.checkViolations(contractAddress)),
    carePool: await helpers.getPoolDistribution(await helper.checker.carePools())
  };
};

module.exports = { generateAuditReport };
