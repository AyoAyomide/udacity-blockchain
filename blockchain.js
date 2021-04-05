const SHA256 = require('crypto-js/sha256');
// const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.generateGenesisBlock();
    }
    generateGenesisBlock() {
        this.chain = [];
        this.addBlock("block header start here");
    }

    addBlock(data) {
        let blockBody = new Block.Block(data);
        blockBody.hash = SHA256(data).toString();
        blockBody.previousblockhash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '';
        blockBody.time = new Date().getTime().toString().slice(0, -3);
        blockBody.height = this.chain.length;
        this.chain.push(blockBody);
    }
}
let blochchain = new Blockchain();
setTimeout(() => {
    blochchain.addBlock("sam");
    console.log(blochchain);
}, 1000);

// module.exports.Blockchain = Blockchain;
