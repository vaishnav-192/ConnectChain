const express = require('express');
const blockch = require('./blockchain');
const bodyParser = require('body-parser');
const PubSub = require('./publishSubscribe');
const request = require('request');

const app = express();
// start the dir server by python -m http.server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
const blockchain = new blockch();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

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
});

const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log('replace chain on sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    })
};

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
    syncChains();
});