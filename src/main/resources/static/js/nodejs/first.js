// import하고싶은 녀석을 require해서 객체로 만듦. import할땐 파일의 경로까지 포함해야함
let repository = require("./file-repository.js");
let fs = require('fs');

// node package 명도 입력할수 있써
let newlec = require("newlec-hello");

console.log(newlec.hello());


// let dirList = repository.findAll("../", {
//     typeName:".js" // typeName: ".js" 와 같이 공백이 있으면 안됨ㅠ
// });     // object 반환

// // 모아서 string으로 만들어죠요
// let csv = dirList.join(",");

// fs.writeFileSync("./directoryList.txt", csv);