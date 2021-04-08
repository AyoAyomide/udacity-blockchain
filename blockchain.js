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
                        if (validChainArr.includes(false)) reject({ error: 'invalid blockchain', data: validChainArr });
                        if (validBlockArr.includes(false)) reject({ error: 'invalid block', data: validBlockArr });
                        if (!validChainArr.includes(false) && !validBlockArr.includes(false)) resolve(true);
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
// modify data in blockchain and test if they will pass through
// let realData = JSON.stringify({
//     hash: 'c2429f395bcd6275fab889ae8b755f3df766cc98a48f06e596237e213276c3bd',
//     height: 2,
//     body: 'Test Block - 2',
//     time: '1617725146',
//     previousblockhash: '8218010b147ef6dfe410a09da663348d1109c6b164f44866d1b4233011125b5d'
// });
// let fakeData = JSON.stringify({
//     hash: 'c2429f395bcd6275fab889ae8b755f3df766cc98a48f06e596237e213276c3bd',
//     height: 2,
//     body: 'Test Block - 10',
//     time: '1617725146',
//     previousblockhash: '8218010b147ef6dfe410a09da663348d1109c6b164f44866d1b4233011125b5d'
// });
// dbBox.addLevelDBData(2, realData);
module.exports.Blockchain = Blockchain;
