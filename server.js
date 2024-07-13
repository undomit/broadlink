'use strict';

const express = require('express');
const broadlink = require('node-broadlink');
const bodyParser = require('body-parser');
const path = require('path');
const {promises: fs} = require('fs');

const app = express();

app.use(bodyParser.json());;


const discoverDevice = async () => {
    const device = await broadlink.discover();

    return device;
}

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

let device;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/discover', async (req, res) => {
    console.log('Discovering...');

    const [dev] = await discoverDevice();
    console.log(dev);
    
    if (dev) {
        await dev.auth();
        device = dev;
    }

    res.json({data: dev});
});

app.get('/learn', async (req, res) => {
    console.log('Learning mode...');
    
    await device.enterLearning();
    
    const intervalId = setInterval(async () => {
        try {
            console.log('checking data..')
            
            const irPacket = await device.checkData();
            
            res.json({data: [...irPacket]});
            
            clearInterval(intervalId);
        } catch (err) {console.log(err + 'error')}
    }, 1000);
})


app.post('/ir', async (req, res) => {
    console.log('Sending ir data...');
    const data = req.body;
    console.log(data);

    const response = await device.sendData(data)

    res.json({data: 'success'});
    
})

app.listen(3000, () => console.log('Listening on port 3000...'));