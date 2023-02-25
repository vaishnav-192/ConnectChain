const cH = require("./cryptoHash");

const genesis={
    timestam:Date.now(),
    prevhash:"0",
    data:"hello world",
    roothash:cH(this.timestam, this.prevhash, this.data)
}

module.exports = {genesis};