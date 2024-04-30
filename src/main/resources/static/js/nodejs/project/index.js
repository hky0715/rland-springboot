const express = require('express');

const server = express();
server.listen(80);


// use는 spring의 requestMapping과 같다.
// server.use("/index", (req,resp)=>{});

// connect보다 업그레이드 된 express! routing이 된대!!!!!!!!! get, post를 구분할 수 있게 되었다!!!!!! 
server
.route("/index")
.get((req, resp)=>{});