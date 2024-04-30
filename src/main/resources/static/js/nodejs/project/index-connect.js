const connect = require("connect");
const path = require("path");
const serveStatic = require("serve-static");

// connect module 객체 app을 만듦
const app = connect();
app.listen(80);

// home directory setting!
app.use(serveStatic(path.join(__dirname, "public")))

app.use("/index", (req, resp)=>{
    console.log(path.join(__dirname, "public"));
    resp.end("index page!");
});

app.use("/menu/list", (req, resp)=>{
    resp.end("menu list page");
});

console.log("서버가 80번 포트로 실행되었음...");