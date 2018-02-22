// read contract file off hard drive
// path module will add cross platform compatibility
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

// read in raw source code
const source = fs.readFileSync(lotteryPath, 'utf8');

// export compiled Lottery contracts
module.exports = solc.compile(source, 1).contracts[':Lottery'];

// log all compiled contracts for testing
// comment out line 13.
// uncomment line 19.
// run "node compile.js" in terminal to see output
// console.log(solc.compile(source, 1));
