const block = require('./chain');

class blockchain{
    constructor(){
        this.chain = [block.gene()];
    }

    addblock({data}){
        const newblock = block.mineblock({prevBlock:this.chain[this.chain.length-1], data:"block1"});
        this.chain.push(newblock);
    }

    // static isvalid(chain){
    //     if(chain[0]!==block.gene())return false;
    // }
}

const blch = new blockchain();
blch.addblock({data: "b1"});
console.log(blch);

module.exports = blockchain;