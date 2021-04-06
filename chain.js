/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
// const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function () { console.log("Waiting...") }, 100);

/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/


// (function theLoop(i) {
// 	i++;
// 	setTimeout(() => {
// 		if (i < 10) theLoop(i);
// 		myBlockChain.addBlock("Test Block - " + i);
// 		// if (i == 10) { console.log(myBlockChain.chain) }
// 	}, 100);
// })(0);

// myBlockChain.getBlock(3);
// myBlockChain.getBlockHeight();
// myBlockChain.validateBlock(3);


/***********************************************
 ** Function to get the Height of the Chain ****
 ***********************************************/

/*
// Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
myBlockChain.getBlockHeight().then((height) => {
	console.log(height);
}).catch((err) => { console.log(err);});
*/

/***********************************************
 ******** Function to Get a Block  *************
 ***********************************************/

// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
// myBlockChain.getBlock(2).then((block) => {
// 	console.log(block);
// }).catch((err) => { console.log(err);});


/***********************************************
 ***************** Validate Block  *************
 ***********************************************/


// Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
// myBlockChain.validateBlock(0).then((valid) => {
// 	console.log(valid);
// })
// .catch((error) => {
// 	console.log(error);
// })



/** Tampering a Block this is only for the purpose of testing the validation methods */
/*
myBlockChain.getBlock(5).then((block) => {
	let blockAux = block;
	blockAux.body = "Tampered Block";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			myBlockChain.validateBlock(blockAux.height).then((valid) => {
				console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
			})
			.catch((error) => {
				console.log(error);
			})
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});

myBlockChain.getBlock(6).then((block) => {
	let blockAux = block;
	blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			console.log("The Block was modified");
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});

/***********************************************
 ***************** Validate Chain  *************
 ***********************************************/

/*
// Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
myBlockChain.validateChain().then((errorLog) => {
	if(errorLog.length > 0){
		console.log("The chain is not valid:");
		errorLog.forEach(error => {
			console.log(error);
		});
	} else {
		console.log("No errors found, The chain is Valid!");
	}
})
.catch((error) => {
	console.log(error);
})
*/