const express = require("express");
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send("Counter");
})

app.use('/counter', (request, response) => {
    let fs = require("fs");
    counter = Number(fs.readFileSync("count.txt").toString());
    response.send(`Counter: ${counter}`);
    counter++;
    fs.writeFile("count.txt", String(counter), error => error);
})

app.listen(port);