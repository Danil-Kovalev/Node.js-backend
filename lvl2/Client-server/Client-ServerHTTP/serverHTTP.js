let http = require('http');
let queryString = require('querystring');

const port = 8080;

let server = http.createServer();

server.listen(port, () => {
    console.log(`Http server is running on port: ${port}`);
})

server.on('connection', (socket) => {
    let startConnection = new Date();
    console.log("---------------------------");
    console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
    server.on('request', (request, response) => {
        let body;
        if (request.method == 'POST') {
            body = '';
        }
    
        request.on('data', (data) => {
            let timeStartGetData = new Date();
            body += data;
            let resultTime = new Date().getTime() - timeStartGetData.getTime();
            console.log("Time get and send text: " + resultTime + "ms");
        });

        setTimeout(() => {
            console.log('Socket destroyed:' + socket.destroyed);
            socket.destroy();
        },20000);
    
        request.on('end', () => {
            let post = JSON.stringify(queryString.parse(body));
            console.log("Data client: " + post);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(post);
        });
    });
    
    socket.on('close', function() {
        let resultTimeConnection = new Date().getTime() - startConnection.getTime();
        console.log('CLOSED: ' + socket.remoteAddress + ':' + socket.remotePort);
        console.log("Time connection: " + resultTimeConnection + "ms");
        console.log("---------------------------");
    });
})

server.on('error', (error) => {
    console.log('Error: ' + error);
});

setTimeout(() => {
    console.log("Server closed!");
    server.close();
},25000);