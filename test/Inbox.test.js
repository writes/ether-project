const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const sinon = require('sinon');

const provider = ganache.provider();

// Web3 instance and provider for ganache
const web3 = new Web3(provider);

// import interface and bytecode from compiled contract
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let sandbox;
const INITIAL_STRING = 'Hi There!';

beforeEach(async () => {
  // list accounts
  accounts = await web3.eth.getAccounts();
  sandbox = sinon.sandbox.create();

  sandbox.stub(web3.eth.Contract.prototype, 'deploy').returns('expected returns');
  sandbox.stub(web3.eth.Contract.prototype, 'send').returns('expected returns');
  // use accounts to deploy contract
  // represents what exists on chain
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
});

afterEach(async () -> {
  sinon.sandbox.restore();
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // assert the value exists
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
});
