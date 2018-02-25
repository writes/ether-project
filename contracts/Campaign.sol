pragma solidity ^0.4.17;

contract Campaign {
    // struct definition not an instance
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        // create new variable of type Request named newRequest which equals an instance of a struct
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
      Request storage request = requests[index];

      // check if sender is a donor
      require(approvers[msg.sender]);
      // check that sender has NOT already voted
      require(!request.approvals[msg.sender]);

      // set approver to true and increase the total approval account
      request.approvals[msg.sender] = true;
      request.approvalCount++;
    }
}
