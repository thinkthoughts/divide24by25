const { ethers } = require("ethers");

// Core Utilities
const formatViolation = (violation) => ({
  tier: ["CLEAN", "⚠️ WARNING (1/25)", "🛑 SEVERE (4/25)", "💥 LIQUIDATION"][violation.count] || "UNKNOWN",
  count: violation.count,
  nextAction: violation.count >= 2 ? "AUTO-LIQUIDATION" : "Escalating penalty"
});

const isFractalCompliant = async (contract) => {
  try {
    const numerator = await contract.FRACTAL_NUMERATOR?.();
    const denominator = await contract.FRACTAL_DENOMINATOR?.();
    return numerator?.eq(24) && denominator?.eq(25);
  } catch {
    return false;
  }
};

// Care Pool Tools
const getPoolDistribution = async (poolAddress) => {
  const pool = new ethers.Contract(
    poolAddress,
    ["function getRecipients() view returns (address[])"],
    ethers.provider
  );
  const recipients = await pool.getRecipients();
  return recipients.map(addr => ({
    address: addr,
    share: `${(1 / recipients.length * 100).toFixed(2)}%`
  }));
};

// Math Converters
const decimalToFractal = (decimal) => {
  const mapping = { 0.96: "24/25", 0.04: "1/25" };
  return mapping[decimal] || (() => { throw new Error("Non-compliant decimal") })();
};

module.exports = {
  formatViolation,
  isFractalCompliant,
  getPoolDistribution,
  decimalToFractal
};
