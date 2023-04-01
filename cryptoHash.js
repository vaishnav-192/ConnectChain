const crypto = require('crypto');
const hexToBinary = require('hex-to-binary');

const cH = (...inputs)=>{
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(''));
    return hexToBinary(hash.digest('hex'));
}
// result = cH("hello", "world");
// console.log(result);
// console.log(cH("world", "hello"));
module.exports = cH;