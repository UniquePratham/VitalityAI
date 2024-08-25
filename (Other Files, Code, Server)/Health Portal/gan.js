const Web3 = require('web3');
const web3 = new Web3('http://192.168.0.109:8545'); // URL to your Ganache CLI instance

web3.eth.getChainId().then(console.log);
