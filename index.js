const blockch = require('./blockchain');
const express = require('express');

const app = express();

app.get('/api/blocks', (req, res)=>{
    res.json(blockch.chain);
})

const PORT = 3000;
app.listen(PORT, ()=>{`listening to ${PORT}`});