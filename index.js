const express = require('express');
const blockchain = require('./blockchain');
const bodyParser = require('body-parser');
const PubSub = require('./publishSubscribe');

const app = express();
app.use(bodyParser.json());
const blockch = new blockchain();
const pubsub = new PubSub({ blockch });

setTimeout(
    () => pubsub.broadcastChain(), 1000
);


app.get("/api/blocks", (req, res) => {
    res.json(blockch.chain);
});

app.post("/api/mine", (req, res) => {
    const { data } = req.body;

    blockch.addblock({ data });
    res.redirect("/api/blocks");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});