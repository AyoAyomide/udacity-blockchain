const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');
let dbBox = new LevelSandbox.LevelSandbox();
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
        let stringifyObject = JSON.stringify(blockBody);
        dbBox.addLevelDBData(blockBody.height, stringifyObject);
        this.chain.push(blockBody);
    }

    getBlock(blockHeight) {
        return new Promise((resolve, reject) => {
            dbBox.getLevelDBData(blockHeight)
                .then(data => resolve(JSON.parse(data)))
                .catch(err => reject(err));
        });
    }

    getBlockHeight() {
        dbBox.getBlocksCount().then(data => {
            console.log(data);
        }).catch(err => {
            console.log(data);
        });
    }

    validateBlock(blockHeight) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.getBlock(blockHeight).then(data => {
                let validBlockHash = SHA256(data.body).toString();
                let blockHash = data.hash;
                validBlockHash === blockHash ? resolve(true) : reject(false);
            })
        })
    }

    validateChain() {

    }
}
// let blochchain = new Blockchain();
// setTimeout(() => {
//     blochchain.addBlock("sam");
//     console.log(blochchain);
// }, 1000);

module.exports.Blockchain = Blockchain;


// dbBox.addLevelDBData("sam", "hello");
// dbBox.getBlocksCount();