const chatWindow = document.querySelector("#chat-window");
const connButton = chatWindow.querySelector(".btn-conn");
const sendButton = chatWindow.querySelector(".btn-send");
const textInput = chatWindow.querySelector("input[name='message']");
const nameInput = chatWindow.querySelector(".input-name");
const ul = chatWindow.querySelector("ul");


let socket = null;

connButton.onclick=function(){
    // sock = new WebSocket("ws://192.168.0.54:8080/chat");
    socket = new WebSocket("ws://192.168.0.75:8080/chat");
    
    socket.onopen = (e) => {
        let data = {type:TYPE_CONNECT, content:nameInput.value, msg:''};
        socket.send(JSON.parse(data));

        let li = `<li>서버에 연결되었습니다.</li>`;
        ul.insertAdjacentHTML("beforeend", li);
        textInput.disabled=false;
    };
    socket.onclose = () => {};
    socket.onmessage = (e) => {
        let li = `<li>${e.data}</li>`;
        ul.insertAdjacentHTML("beforeend", li);
    };
}

sendButton.onclick=function(){
    if(!socket)
        return;

    let text = textInput.value;
    socket.send(text);
}