/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.db.get(key, (err, value) => {
                resolve(value);
                reject(err);
            })

            // Add your code here, remember in Promises you need to resolve() or reject()
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.db.put(key, value, (err) => {
                if (err) { reject(err) }
                else {
                    resolve("good");
                }
            })
            // Add your code here, remember in Promises you need to resolve() or reject() 
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
        });
    }


}

let dbBox = new LevelSandbox();
// dbBox.addLevelDBData("sam", "hello");
dbBox.getLevelDBData("sam");
// module.exports.LevelSandbox = LevelSandbox;
