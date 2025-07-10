// tasks/compliance.js
const { task } = require("hardhat/config");
const ComplianceHelper = require("../scripts/utils/compliance-helper");
const { generateAuditReport } = require("./compliance/audit-report");

task("compliance:verify", "Verify contract compliance")
  .addParam("address", "Contract address to verify")
  .setAction(async (taskArgs, hre) => {
    const helper = new ComplianceHelper(await hre.ethers.getSigner());
    const isCompliant = await helper.verifyContract(taskArgs.address);
    console.log(`✓ Compliance status: ${isCompliant ? "VALID" : "VIOLATION"}`);
  });

task("compliance:audit", "Full fractal compliance audit")
  .addParam("contract", "Target contract address")
  .addOptionalParam("output", "Report file path", "./audits/latest.json")
  .setAction(async (taskArgs) => {
    const report = await generateAuditReport(taskArgs.contract);
    require("fs").writeFileSync(taskArgs.output, JSON.stringify(report, null, 2));
    console.log(`Audit saved to ${taskArgs.output}`);
  });
