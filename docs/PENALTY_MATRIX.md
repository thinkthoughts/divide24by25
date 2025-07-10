
---

### 2. **`docs/PENALTY_MATRIX.md`** (Enforcement Protocol)
```markdown
# Penalty Matrix v1.0
*Effective 2025-07-10*

## Fractal Escalation Tiers
| Tier | Violation Count | Penalty | Trigger Conditions |
|------|-----------------|---------|--------------------|
| 1 | 1 | 1/25 value burned | - Missed 1/25 flow<br> - Unverified care pool |
| 2 | 3 | 4/25 value burned | - Repeat Tier 1 violations<br> - False geo-proof |
| 3 | 5 | 25/25 liquidation | - Sybil attacks<br> - Protocol griefing |

## Automated Enforcement
```solidity
// Penalty application logic
function _applyPenalty(address violator) internal {
  uint256 tier = violations[violator] / 2; // Integer division
  uint256 penalty = balanceOf(violator) * (tier == 0 ? 1 : tier * 4) / 25;
  
  if (violations[violator] >= 5) {
    _liquidate(violator);
  } else {
    _burn(violator, penalty);
  }
}
