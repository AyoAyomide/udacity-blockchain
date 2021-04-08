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
        // let self = this;
        return new Promise((resolve, reject) => {
            dbBox.getBlocksCount()
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
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
        let self = this;
        let dbData = async () => {
            let validChainArr = [];
            let validBlockArr = [];
            let chain = await dbBox.getAllBlock();
            return new Promise((resolve, reject) => {
                chain.forEach((el, index) => {
                    let prevChainKey = index + 1;
                    if (prevChainKey != chain.length) {
                        if (el.hash == chain[prevChainKey].previousblockhash) {
                            validChainArr.push(true);
                        } else {
                            validChainArr.push(false);
                        }
                    }
                    if (el.hash == SHA256(el.body).toString()) {
                        validBlockArr.push(true);
                    } else {
                        validBlockArr.push(false);
                    }
                    if (index == (chain.length - 1)) {
                        if (validChainArr.includes(false) || validBlockArr.includes(false)) {
                            reject(false);
                        } else {
                            resolve(true);
                        }
                    }
                });
            })
        }
        return new Promise((resolve, reject) => {
            dbData()
            .then(resolve)
            .catch(reject)
        })

    }
}

module.exports.Blockchain = Blockchain;
