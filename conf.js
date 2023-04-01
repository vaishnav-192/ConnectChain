const cH = require("./cryptoHash");

const INITIAL_DIFFICULTY=2;
const MINE_RATE=1000;//1 s = 1000 ms

const genesis={
    timestam:Date.now(),
    prevhash:"0",
    data:"hello world",
    roothash:cH(this.timestam, this.prevhash, this.data),
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
}

module.exports = {genesis, MINE_RATE};