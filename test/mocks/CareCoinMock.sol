// SPDX-License-Identifier: ANTIVIOLENT-FRACTAL
pragma solidity ^0.8.0;

contract CareCoinMock {
    uint256 public constant FRACTAL_NUMERATOR = 24;
    uint256 public constant FRACTAL_DENOMINATOR = 25;
    
    function totalSupply() external pure returns (uint256) {
        return 1000000 * 10**18; // 1M tokens
    }
}
