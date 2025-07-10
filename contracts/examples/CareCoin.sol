// SPDX-License-Identifier: ANTIVIOLENT-FRACTAL
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./AntiviolentBase.sol"; // Your license enforcement contract

/**
 * @title CareCoin
 * @notice Fractal-compliant token with 24/25 retention and 1/25 auto-redistribution
 * @dev Inherits from both ERC20 and your AntiviolentBase
 */
contract CareCoin is ERC20, AntiviolentBase {
    address public immutable carePool;
    uint256 private constant FRACTAL_DENOMINATOR = 25;

    constructor(address _carePool) ERC20("CareCoin", "CARE") {
        carePool = _carePool;
        _mint(msg.sender, 1000000 * 10**decimals()); // Initial supply
    }

    /**
     * @notice Overridden transfer with fractal enforcement
     * @dev Automatically splits 24/25 to recipient, 1/25 to carePool
     */
    function transfer(address to, uint256 amount) 
        public 
        override
        only24by25 // License-enforced modifier
        returns (bool) 
    {
        uint256 retainedAmount = (amount * 24) / FRACTAL_DENOMINATOR;
        uint256 careAmount = amount / FRACTAL_DENOMINATOR;

        _transfer(msg.sender, to, retainedAmount);
        _transfer(msg.sender, carePool, careAmount);

        return true;
    }

    /**
     * @notice Implements required redistribution from AntiviolentBase
     */
    function _redistribute(uint256 amount) internal override returns (bool) {
        _transfer(msg.sender, carePool, amount);
        return true;
    }
}
