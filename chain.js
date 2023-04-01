const blockchain = require('./blockchain');
const {genesis} = require('./conf');
const cH = require('./cryptoHash');
class block{
    constructor({timestam, prevhash, roothash, data, nonce, difficulty}){
        this.timestam = timestam;
        this.data=data;
        this.prevhash=prevhash;
        this.roothash=roothash;
        this.nonce = nonce;
        this.difficulty =difficulty;
    }
    static gene(){
        return new this(genesis);
    }
    static mineblock({prevBlock, data}){
        let roothash, timestam;
        const prevhash = prevBlock.roothash;
        const {difficulty} = prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestam=Date.now();
            roothash = cH(timestam, prevhash, data, difficulty, nonce);
        }while(roothash.substring(0, difficulty)!=='0'.repeat(difficulty));
        return new this({
            timestam,
            prevhash,
            data,
            difficulty,
            nonce,
            roothash,
        });
    }
    
}

// const gen = block.gene();
// console.log(gen);

// const res = block.mineblock({prevBlock: gen, data:"abcd"});
// console.log(res);

module.exports = block;