let http = require('http');
let querystring = require('querystring');

let data = querystring.stringify({
    message: "Hello from client"
});

let options = {
    hostname: '127.0.0.1',
    port: 8080,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

let startSend;

let request = http.request(options, (response) => {
    startSend = new Date();
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        console.log('Body: ' + chunk);
        let result = new Date().getTime() - startSend.getTime();
        console.log("Time send and get data: " + result + "ms");
    });

    response.on('end', () => {
        console.log('No more data in response.');
    });

    response.on('close', () => {
        console.log('Connection close!');
    })
});

request.on('error', function (error) {
    console.log('Problem with request:', error.message);
});

request.write(data);
request.end();