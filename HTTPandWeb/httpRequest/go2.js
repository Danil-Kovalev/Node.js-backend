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

function parseTcpStringAsHttpRequest(string) {
  return { 
    method: string.match(/^[a-zA-z]+(?=\s)/).toString(),
    uri: string.match(/(\/[a-zA-Z]+)+(\.[a-z]+)?(?=\s)/g).toString(),
    headers: {
        "Host": string.match(/(?<=(Host|HOST):\s).+(?=\s)/g).toString(),
        "Accept": string.match(/(?<=Accept:\s).+(?=\s)/g).toString(),
        "Accept-Language": string.match(/(?<=Accept-Language:\s).+(?=\s)/g).toString(),
        "Accept-Encoding": string.match(/(?<=Accept-Encoding:\s).+(?=\s)/g).toString(),
        "User-Agent": string.match(/(?<=User-Agent:\s).+(?=\s)/g).toString(),
        "Content-Length": string.match(/(?<=Content-Length:\s)\d+(?=\s)/g).toString()
    },
    body: string.match(/(?<=\d\s{2}).+/).toString()
  }; 
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));