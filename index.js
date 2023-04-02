const express = require('express');
const blockch = require('./blockchain');
const bodyParser = require('body-parser');
const PubSub = require('./publishSubscribe');

const app = express();
app.use(bodyParser.json());
const blockchain = new blockch();
const pubsub = new PubSub({ blockchain });

setTimeout(
    () => pubsub.broadcastChain(), 1000
);


app.get("/api/blocks", (req, res) => {
    res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
    const { data } = req.body;

    blockchain.addblock({ data });
    // for (let i = 1; i < 3; i++) {
    //     blockchain.addblock({ data });
    // }
    //res.redirect("/api/mine");
    pubsub.broadcastChain();
    res.redirect("/api/blocks");
})

const DEFAULT_PORT = 3000;
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});