const { expect } = require("chai");
const ComplianceHelper = require("../compliance-helper");

describe("Compliance Helper", function() {
  let helper;
  
  before(async () => {
    const [owner] = await ethers.getSigners();
    helper = new ComplianceHelper(owner);
  });
  
  it("Should verify compliant contracts", async () => {
    const status = await helper.checkViolations(validToken);
    expect(status.tier).to.equal("CLEAN");
  });
});
