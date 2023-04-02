const block = require('./chain');
const cH = require('./cryptoHash');

class blockchain {
    constructor() {
        this.chain = [block.gene()];
    }

    addblock({ data }) {
        const newblock = block.mineblock({ prevBlock: this.chain[this.chain.length - 1], data: data });
        this.chain.push(newblock);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer");
            return;
        }
        if (!blockchain.isvalid(blch.chain)) {
            console.error("The incoming chain is not valid");
            return;
        }
        this.chain = chain;
    }

    static isvalid(chain) {
        // console.log(chain[0]);
        // console.log(block.gene());
        if (JSON.stringify(chain[0]) !== JSON.stringify(block.gene())) return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestam, prevhash, data, roothash, difficulty, nonce } = chain[i];

            const lastDifficulty = chain[i - 1].difficulty;

            const realLastHash = chain[i - 1].roothash;
            //console.log(chain[i]);

            if (prevhash !== realLastHash) return false;
            const validatedhash = cH(timestam, prevhash, data, difficulty, nonce);
            if (roothash !== validatedhash) return false;
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }
        return true;
    }

}

const blch = new blockchain();
// blch.addblock({data: "b1"});
for (let i = 1; i <= 5; i++) {
    let s = "block";
    s += '0' + i;
    blch.addblock({ data: s });
}
console.log(blch.chain);
const res = blockchain.isvalid(blch.chain);
console.log(res);
//console.log(block.gene())

module.exports = blockchain;