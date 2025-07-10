// SPDX-License-Identifier: ANTIVIOLENT-1.0
pragma solidity ^0.8.0;

abstract contract AntiviolentLicense {
    address public constant CARE_POOL_REGISTRY = 0x2470...CARE;
    
    modifier only24by25 {
        require(balanceOf(msg.sender) <= totalSupply() * 24 / 25, "24/25 cap");
        _;
    }
    
    function _redistribute(uint256 amount) internal virtual returns (bool);
}
