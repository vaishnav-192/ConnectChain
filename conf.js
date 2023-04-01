const cH = require("./cryptoHash");

constINITIAL_DIFFICULTY=2;
const genesis={
    timestam:Date.now(),
    prevhash:"0",
    data:"hello world",
    roothash:cH(this.timestam, this.prevhash, this.data),
    difficulty: constINITIAL_DIFFICULTY,
    nonce: 0,
}

module.exports = {genesis};