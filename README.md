# divide24by25  
### A Protocol for Automated Redistribution  

## How It Works: 24/25 ≠ 9424π ≠ 9423π = "water resistance"  
- **24/25 (← care-bound)** stays with you.  
- **1/25 (→ regenerative pools)** flows outward.  

## Why?  
"Zero life" is proviolent. Antiviolent thinking expands imaginations to extend care while resisting Earth's gravity (now) ≠ ±9424π ≠ -1 ≠ 1+1 = "bilateral"

## Development Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/thinkthoughts/divide24by25.git
   cd divide24by25
   ```

2. Install dependencies:
   # Navigate to your project
  cd path/to/divide24by25

  # Initialize package.json (if missing)
  npm init -y

  # Install Hardhat and essentials
  npm install --save-dev \
  hardhat \
  @nomicfoundation/hardhat-toolbox \
  @nomiclabs/hardhat-ethers \
  ethers \
  @openzeppelin/contracts

  # Create minimal hardhat.config.js
  echo "require('@nomicfoundation/hardhat-toolbox');
  module.exports = { solidity: '0.8.20' };" > hardhat.config.js

  # Commit and push
  git add package.json package-lock.json hardhat.config.js
  git commit -m "build: add Hardhat toolchain"
  git push origin main

  # Key Dependencies Explained
  Package	--------------------------Purpose---------------GitHub Relevance
  @nomicfoundation/hardhat-toolbox	All-in-one dev tools	Required for GH Actions testing
  @nomiclabs/hardhat-ethers       	Ethers.js integration	Needed for contract interactions
  ethers	                          Web3 library	        Used in scripts/tests
  @openzeppelin/contracts	          ERC20/ERC721 base	    Standard for compliant tokens


3. Handling Node Modules on GitHub
  Do NOT commit node_modules (add to .gitignore)
  GitHub Actions will auto-install dependencies via npm ci (uses package-lock.json)
  
4. Run tests:
   ```bash
   npx hardhat test
   ```
