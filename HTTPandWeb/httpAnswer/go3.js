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
Date: Sun, 18 Oct 2012 10:36:20 GMT
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${body.length}

${body}`);
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode = 0;
    let statusMessage = "";
    if ($method == "GET" && /\/sum\?nums=(\d+,?)+/g.test($uri)) {
        statusCode = 200;
        statusMessage = "OK";
        $body = $uri.match(/\d/g).map(element => Number(element)).reduce((sum, curr) => sum + curr).toString();
    }
    else if (/^(?!\/sum)/g.test($uri)) {
        statusCode = 404;
        statusMessage = "Not Found";
        $body = "not found";
    }
    else if (/(\/sum\?)?(?!nums=)/g.test($uri)) {
        statusCode = 400;
        statusMessage = "Bad Request";
        $body = "bad request";
    }
    outputHttpResponse(statusCode, statusMessage, $headers, $body);
}
   
function parseTcpStringAsHttpRequest($string) {
    return { 
        method: $string.match(/^[a-zA-z]+(?=\s)/).toString(),
        uri: $string.match(/(?<=([a-zA-Z]\s))(\/[a-z]+)?(\?[a-z]+\=)?(\d+,?)+(?=\s)/g).toString(),
        headers: {
            "Host": $string.match(/((?<=(Host|HOST):\s).+(?=\s))?/g).toString(),
            "Accept": $string.match(/((?<=Accept:\s).+(?=\s))?/g).toString(),
            "Accept-Language": $string.match(/((?<=Accept-Language:\s).+(?=\s))?/g).toString(),
            "Accept-Encoding": $string.match(/((?<=Accept-Encoding:\s).+(?=\s))?/g).toString(),
            "User-Agent": $string.match(/((?<=User-Agent:\s).+(?=\s))?/g).toString(),
            "Content-Length": $string.match(/((?<=Content-Length:\s)\d+(?=\s))?/g).toString()
        },
        body: $string.match(/((?<=\d\s{2}).+)?/).toString()
      };
}
   
http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);