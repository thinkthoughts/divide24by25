// tasks/compliance/audit-report.js
const ComplianceHelper = require("../../scripts/utils/compliance-helper");

async function generateAuditReport(contractAddress) {
  const helper = new ComplianceHelper(await ethers.getSigner());
  
  return {
    timestamp: new Date().toISOString(),
    contract: contractAddress,
    complianceStatus: await helper.verifyContract(contractAddress),
    violations: await helper.checkViolations(contractAddress),
    carePoolStatus: await helper.getCarePoolStatus()
  };
}

module.exports = { generateAuditReport };
