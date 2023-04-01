const blockchain = require('./blockchain');
const {genesis, MINE_RATE} = require('./conf');
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
        let {difficulty} = prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestam=Date.now();
            difficulty = this.adjustDifficulty({orgBlock:prevBlock, timestam});
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

    static adjustDifficulty({orgBlock, timestam}){
        const {difficulty}=orgBlock;
        if(difficulty<1)return 1;
        const difference = timestam-orgBlock.timestam;
        if(difference>MINE_RATE)return difficulty-1;
        else return difficulty+1;
    }
    
}

// const gen = block.gene();
// console.log(gen);

// const res = block.mineblock({prevBlock: gen, data:"abcd"});
// console.log(res);

module.exports = block;