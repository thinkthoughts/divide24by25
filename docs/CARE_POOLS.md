# Care Pool Verification Criteria
*Last updated: ${new Date().toISOString().split('T')[0]}*

## Fractal Qualification Requirements
Recipients must meet **all** of:
- ✅ **Geolocated Impact**  
  `SHA-3` hash of GPS coordinates proving physical presence in:
  - Climate debt zones (Köppen-Geiger classes Dfd, ET)
  - Indigenous territories (UNEP Protected Area ID required)
  - Post-industrial recovery areas (EPA Superfund sites)

- ✅ **Community Governance**  
  ```solidity
  struct GovernanceProof {
    bytes32 daoHash;    // Snapshot of DAO votes
    uint8 minConsensus; // Minimum 24/25 approval
    address[] verifiers; // 24+ signers
  }
✅ Flow Transparency

Public ledger of all 1/25 redistributions (IPFS CID required)

Quarterly ecological audits (Format: ISO 14031:2021)

Active Care Pools
Address	Name	Focus Area	Verification CID
0x2470...CARE	SolarDAO	Renewable Energy	QmXyZ...
0x8a2d...LAND	LandBack	Stewardship	QmAbC...
0xf3c1...WATER	HydroCommon	Restoration	QmDeF...
Verification Process
Submit Proof Bundle

bash
npx hardhat verify-pool \
  --geohash QmGeoProof123 \
  --governance QmGovProof456 \
  --audits QmAudit789
Fractal Consensus

24/25 of existing pools must approve via:

solidity
function voteOnPool(address pool, bool approved) external onlyPools;
On-chain Registration

solidity
registerPool(
  address pool,
  bytes32 geoProof,
  bytes32 governanceProof
) external onlyConsensus;
