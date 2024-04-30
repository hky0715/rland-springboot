const express = require("express");
const ejs = require("ejs");
const path = require("path");

// express 객체를 만들고오
const server = express();

// vue한테 나 어떤 템플릿 엔진 쓴다~~~ 라고 알려줘야 함
server.set("views", path.join(__dirname, "/views"));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));

server.listen(80);


// use는 spring의 requestMapping과 같다.
// server.use("/index", (req,resp)=>{});

// connect보다 업그레이드 된 express! routing이 된대!!!!!!!!! get, post를 구분할 수 있게 되었다!!!!!! 
server
.route("/index")
.get((req, resp)=>{
    // render를 하면 페이지를 찾아요! 페이지에 담아 보낼 데이터(모델)도 함께 쓸 수 있어!
    resp.render("index.ejs", {test:"hello"});
});

