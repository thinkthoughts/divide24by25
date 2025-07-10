# Care Pool Verification Criteria
*Last updated: 2025-07-10*

## Fractal Qualification Requirements
Recipients must meet **all** of:
- ✅ **Geolocated Impact**:  
  `SHA-3` hash of GPS coordinates proving physical presence in:  
  - Climate debt zones :cite[8]  
  - Indigenous territories  
  - Post-industrial recovery areas

- ✅ **Community Governance**:  
  ```solidity
  struct GovernanceProof {
    bytes32 daoHash;    // Snapshot of DAO votes
    uint8 minConsensus; // Minimum 24/25 approval
    address[] verifiers;
  }
