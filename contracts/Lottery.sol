pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .001 ether);

        players.push(msg.sender);
    }


    function random() private view returns (uint) {
        // block and now are global v
        return uint(keccak256(block.difficulty, now, players));
        // takes created hash and turn it in to an unsigned int
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        // must be empty - (0)
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
