// https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

// node_modules/.bin/ganache-cli
// node
// Web3 = require('web3')
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// web3.eth.accounts
// code = fs.readFileSync('Voting.sol').toString()
// solc = require('solc')
// deployedContract = VotingContract.new(['immigration','guns','env'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
// contractInstance = VotingContract.at(deployedContract.address)

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// ==
// deployedContract = VotingContract.new(['immigration','guns','env'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
// contractInstance = VotingContract.at(deployedContract.address)
// ==

contractInstance = VotingContract.at('0xbcff381dd0612b1fa2bfe49bf2e9d4fc9938a684');
candidates = {"immigration": "candidate-1", "guns": "candidate-2", "env": "candidate-3"}

function voteForCandidate(candidateKey) {
  contractInstance.voteForCandidate(candidateKey, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateKey];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateKey).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
