const UDP = require('dgram');

const client = UDP.createSocket('udp4');

const port = 8080;
const host = '127.0.0.1';

let data = Buffer.from("Hello");

let startSend = new Date();
client.send(data, port, host, (err) => {
    if (err) {
        console.error('Failed to send packet!');
        client.close();
    }
    else {
        console.log("--------------------------");
        console.log("Data sent to server");
        let result = new Date().getTime() - startSend.getTime();
        console.log("Time send and get text: " + result + "ms");
    }
});

client.on('message', (message,info) => {
    console.log("Data received from server: " + message.toString());
    console.log(`Ip server: ${info.address}:${info.port}`);
    console.log("--------------------------");
});

setTimeout(() => {
    console.log("Client close!");
    client.close();
},10000);