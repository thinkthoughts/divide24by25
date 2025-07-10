import "../LICENSE.sol";

abstract contract AntiviolentBase is AntiviolentLicense {
    function transfer(address to, uint amount) public virtual only24by25 {
        _transfer(to, amount * 24 / 25);
        _redistribute(amount / 25);
    }
}
