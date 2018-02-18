pragma solidity ^0.4.11;

contract ReactExample {
    //state variable private to contract
    //stored in smart contract storage
    //address type holds 160-bit value
    address private owner;
    
    // costructor name must match contract name
    function ReactExample () public {
        // creators address saved in msg.sender
        owner = msg.sender;
    }
    
    // called by owner if contract is compromised
    // destroys contract
    function kill () public {
        require (msg.sender == owner);
        // owner is an address so this will forward balance to owner
        selfdestruct (owner);
    }
    
    function () public payable {
        // revert gives ether to whoever calls it
        revert ();
    }
}