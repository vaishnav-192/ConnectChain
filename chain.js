const blockchain = require('./blockchain');
const {genesis} = require('./conf');
const cH = require('./cryptoHash');
class block{
    constructor({timestam, prevhash, roothash, data}){
        this.timestam = timestam;
        this.data=data;
        this.prevhash=prevhash;
        this.roothash=roothash;
    }
    static gene(){
        return new this(genesis);
    }
    static mineblock({prevBlock, data}){
        const timestam = Date.now();
        const prevhash = prevBlock.roothash;
        return new this({
            timestam,
            prevhash,
            data,
            roothash: cH(timestam, prevhash, data)
        })
    }
    
}

// const gen = block.gene();
// console.log(gen);

// const res = block.mineblock({prevBlock: gen, data:"abcd"});
// console.log(res);

module.exports = block;