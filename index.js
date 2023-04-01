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
    res.redirect("/api/blocks");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});