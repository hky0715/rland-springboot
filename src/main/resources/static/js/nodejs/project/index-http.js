const http = require("http");
http.createServer((req, resp) => {
    console.log("hehe");
    resp.write("hehehehehehehe!!!!");
    resp.end();

}).listen(80);

// server.on("request", ()=>{
//     console.log("Hello~~~~~");
// })
// server.listen(80);

