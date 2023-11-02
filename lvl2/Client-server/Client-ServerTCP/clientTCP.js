const net = require('net');
const client = new net.Socket();

const port = 8080;
const host = '127.0.0.1';

let startSend, originalText = "Hello From Client";

client.connect(port, host, () => {
    console.log("Connected");
    startSend = new Date();
    client.write(originalText);
})

client.on('data', (data) => {
    console.log('Server says: ' + data);

    let result = new Date().getTime() - startSend.getTime();
    console.log("Time send and get text: " + result + "ms");
});

client.on('error', (error) => {
    console.log('Problem => ' + error);
})

client.on('close', () => {
    console.log('Connection closed');
});