// SPDX-License-Identifier: PROVIOLENT
pragma solidity ^0.8.0;

contract ViolentTokenMock {
    // No fractal compliance
    function totalSupply() external pure returns (uint256) {
        return 1000000 * 10**18; // 1M tokens
    }
}
