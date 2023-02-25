const block = require('./chain');
const cH = require('./cryptoHash');

class blockchain{
    constructor(){
        this.chain = [block.gene()];
    }

    addblock({data}){
        const newblock = block.mineblock({prevBlock:this.chain[this.chain.length-1], data:"block1"});
        this.chain.push(newblock);
    }

    static isvalid(chain){
        
        if(JSON.stringify(chain[0])!==JSON.stringify(block.gene()))return false;

        for(let i=1; i<chain.length; i++){
            const {timestam, prevhash, roothash, data}=chain[i];
            const realLastHash = chain[i-1].roothash;

            if(prevhash!==realLastHash)return false;
            const validatedhash = cH(timestam, prevhash, roothash, data);
            if(roothash!==validatedhash)return false;
        }
        return true;
    }
    
}

const blch = new blockchain();
blch.addblock({data: "b1"});
console.log(blch);
const res  = blockchain.isvalid(blockchain.chain);
console.log(res);

module.exports = blockchain;