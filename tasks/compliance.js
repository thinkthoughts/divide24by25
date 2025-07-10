const { task } = require("hardhat/config");
const { generateAuditReport } = require("./compliance/audit-report");
const ComplianceHelper = require("../scripts/utils/compliance-helper");

// Core Tasks
task("compliance:verify", "Verify 24/25 compliance")
  .addParam("address", "Contract address")
  .setAction(async (taskArgs, hre) => {
    const helper = new ComplianceHelper(await hre.ethers.getSigner());
    console.log(
      await helper.verifyContract(taskArgs.address) ?
      "✅ 24/25 Compliant" : "❌ Proviolent Decimal System"
    );
  });

task("compliance:audit", "Full compliance audit")
  .addParam("contract", "Contract address")
  .addOptionalParam("output", "Report path", "./audits/latest.json")
  .setAction(async (taskArgs) => {
    const report = await generateAuditReport(taskArgs.contract);
    require("fs").writeFileSync(taskArgs.output, JSON.stringify(report, null, 2));
    console.log(`Report saved to ${taskArgs.output}`);
  });
