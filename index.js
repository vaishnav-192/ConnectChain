const express = require('express');
const blockchain = require('./blockchain');

const app = express();
const blockch = new blockchain();
app.get("/api/blocks", (req, res) => {
    res.json(blockch.chain);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});