let net = require('net');
const server = net.createServer();

const port = 8080;
const host = '127.0.0.1';

server.listen(port, host, () => {
    console.log(`Tcp server is running on host: ${host}, port: ${port}`);
});

server.maxConnections = 3;

let sockets = [];
server.on('connection', function(socket) {
    let startConnection = new Date();
    console.log("---------------------------");
    console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
    sockets.push(socket);

    socket.on('data', function(data) {
        let timeStartGetText = new Date();
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        sockets.forEach(function(socket, index, array) {
            socket.write(socket.remoteAddress + ':' + socket.remotePort + " " + data + '\n');
        });
        let resultTime = new Date().getTime() - timeStartGetText.getTime();
        console.log("Time get and send text: " + resultTime + "ms");
    });

    socket.on('error',function(error){
        console.log('Problem => ' + error);
    });

    setTimeout(() => {
        console.log('Socket destroyed:' + socket.destroyed);
        socket.destroy();
    },20000);

    socket.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
        return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        let resultTimeConnection = new Date().getTime() - startConnection.getTime();
        console.log('CLOSED: ' + socket.remoteAddress + ':' + socket.remotePort);
        console.log("Time connection: " + resultTimeConnection + "ms");
        console.log("---------------------------");
    });
});

server.on('error',function(error){
    console.log('Error: ' + error);
});

setTimeout(function() {
    server.close();
},25000);