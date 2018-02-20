const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// connect to test network
const provider = new HDWalletProvider(
  'want yard actual document tackle mercy purse critic tonight shadow pigeon appear',
  'https://rinkeby.infura.io/lq2NJUPbSasdRhQGRgNE'
);

const web3 = new Web3(provider);
