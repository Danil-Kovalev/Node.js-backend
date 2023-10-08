function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
   }
   
   let contents = readHttpLikeInput();
   
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Server: Apache/2.2.14 (Win32)
Content-Length: ${body.length}
Connection: Closed
Content-Type: text/html; charset=utf-8

${body}`);
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode = 0;
    let statusMessage = "";
    if ($method == "POST" && /^\/([a-z]+)\/.+/g.test($uri)) {
        let check = checkData($body);
        if (check == 1) {
            statusCode = 200;
            statusMessage = `OK`;
            $body = `<h1 style="color:green">FOUND</h1>`;
        }
        else if (check == -1) {
            statusCode = 500;
            statusMessage = `Internal Server Error`;
            $body = `internal server error`;
        } else if (check == 0) {
            statusCode = 404;
            statusMessage = `Not Found`;
            $body = `not found`;
        }
    }
    else if (/^(?!\/)/g.test($uri)) {
        statusCode = 404;
        statusMessage = "Not Found";
        $body = "not found";
    }
    else if (/(\/[a-z])?(?!checkLoginAndPassword)/g.test($uri)) {
        statusCode = 400;
        statusMessage = "Bad Request";
        $body = "bad request";
    }
    outputHttpResponse(statusCode, statusMessage, $headers, $body);
}

function checkData($body) {
    let checkLoginAndPassword = 0;
    let fs = require("fs");
    if (fs.existsSync("C:\\courses\\HTTPandWeb\\formsAndHtmlOutput\\passwords.txt")) {
        let loginAndPassword = {
            login: $body.match(/(?<=login=).+(?=\&)/g).toString(),
            password: $body.match(/(?<=password\=).+/g).toString()
        };
        let data = fs.readFileSync("C:\\courses\\HTTPandWeb\\formsAndHtmlOutput\\passwords.txt").toString();
        data.split("\n").map(element => {
            if (element.match(/^.+(?=\:)/g).toString() === loginAndPassword.login &&
            element.match(/(?<=\:).+/g).toString() === loginAndPassword.password) checkLoginAndPassword = 1;
        });
    }
    else {
        checkLoginAndPassword = -1;
    }
    return checkLoginAndPassword;
}
   
function parseTcpStringAsHttpRequest($string) {
    return { 
        method: $string.match(/^[a-zA-z]+(?=\s)/).toString(),
        uri: $string.match(/(?<=\s)\/.+?(?=\s)/).toString(),
        headers: {
            "Host": $string.match(/((?<=(Host|HOST):\s).+(?=\s))?/g).toString(),
            "Accept": $string.match(/((?<=Accept:\s).+(?=\s))?/g).toString(),
            "Accept-Language": $string.match(/((?<=Accept-Language:\s).+(?=\s))?/g).toString(),
            "Accept-Encoding": $string.match(/((?<=Accept-Encoding:\s).+(?=\s))?/g).toString(),
            "User-Agent": $string.match(/((?<=User-Agent:\s).+(?=\s))?/g).toString(),
            "Content-Length": $string.match(/((?<=Content-Length:\s)\d+(?=\s))?/g).toString()
        },
        body: $string.match(/(?<=\d\s{2}).+/g).toString()
      };
}
   
http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);