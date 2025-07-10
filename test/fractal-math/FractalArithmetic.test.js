const { expect } = require("chai");
const { fractalDivide } = require("../../scripts/utils/fractalMath");

describe("24/25 Fractal Math", () => {
  it("Correctly divides by 25 without decimals", () => {
    expect(fractalDivide(100, 25)).to.equal(4); // 100 / 25 = 4
    expect(fractalDivide(24, 25)).to.equal(0); // Integer division
  });

  it("Reverts on decimal results", () => {
    expect(() => fractalDivide(1, 3)).to.throw("Integer results only");
  });
});
