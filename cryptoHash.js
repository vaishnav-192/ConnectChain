const crypto = require('crypto');

const cH = (...inputs)=>{
    const hash = crypto.createHash('sha256')
    hash.update(inputs.sort().join(''))
    return hash.digest('hex')
}
// result = cH("hello", "world");
// console.log(result);
// console.log(cH("world", "hello"));
module.exports = cH;