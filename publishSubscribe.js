const redis = require('redis');

const CHANNELS = {
    TEST: 'test',
    BLOCKCHAIN: "BLOCKCHAIN"
}

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
        this.pusblisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message));


    }

    handleMessage(channel, message) {
        console.log(`message received.Channel: ${channel} message: ${message}`);
        const parseMessage = JSON.parse(message);
        if (channel == CHAN.BLOCKCHAIN) {
            this.blockchain.replaceChain(parseMessage);
        }
    }

    publish({ channel, message }) {
        this.pusblisher.publish(channel, message);
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        });
    }

}

// const checkPubSub = new PubSub();

// setTimeout(
//     () => checkPubSub.pusblisher.publish(CHANNELS.TEST, "hello"),
//     1000
// );
module.exports = PubSub;