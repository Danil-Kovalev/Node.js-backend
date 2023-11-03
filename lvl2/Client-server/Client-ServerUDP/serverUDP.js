const UDP = require('dgram')

const server = UDP.createSocket('udp4')

const port = 8080
const host = '127.0.0.1';

server.on('listening', () => {
  console.log(`Tcp server is running on host:  ${host}', port: ${server.address().port}`)
})

server.on('message', (message, info) => {
    console.log("--------------------------");
    console.log(`Client connect: ${info.address}:${info.port}`);
    console.log('Data from client: ' + message.toString())

    let timeStartGetText = new Date();
    server.send(message, info.port, info.address, (err) => {
        if (err) {
            console.error("Failed to send response!");
        } else {
            console.log("Response send!");
            let resultTime = new Date().getTime() - timeStartGetText.getTime();
            console.log("Time get and send text: " + resultTime + "ms");
            console.log("--------------------------");
        }
    });
});

server.bind(port);

setTimeout(() => {
    let resultTimeConnection = new Date().getTime() - startConnection.getTime();
    console.log("Server closing");
    console.log("Time connection: " + resultTimeConnection + "ms");
    server.close();
},15000);