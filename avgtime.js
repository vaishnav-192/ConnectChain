const blockchain = require('./blockchain');
const blockch = new blockchain();

blockch.addblock({data: "new data block"});

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, avgTime;

const times=[];

for(let i=0; i<1000; i++){
    prevTimestamp = blockch.chain[blockch.chain.length-1].timestam;
    blockch.addblock({data:`block ${1}`});
    nextBlock=blockch.chain[blockch.chain.length-1];
    nextTimestamp=nextBlock.timestam;

    timeDiff=nextTimestamp-prevTimestamp;
    times.push(timeDiff);

    avgTime = times.reduce((total, num)=>(total+num))/times.length;
    console.log(`Time to mine block: ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, AvgTime: ${avgTime}ms`);
}