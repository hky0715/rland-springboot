const chatWindow = document.querySelector("#chat-window");
const connButton = chatWindow.querySelector(".btn-conn");
const textInput = chatWindow.querySelector("input[name='message']");
const ul = chatWindow.querySelector("ul");
const sendBtn = chatWindow.querySelector(".send");

let sock = null;

connButton.onclick=function(){
    // sock = new WebSocket("ws://192.168.0.54:8080/chat");
    sock = new WebSocket("ws://192.168.0.75:8082/chat");
    // sock = new WebSocket("ws://localhost:8082/chat");
    sock.onopen = (e) => {
        let li = `<li>서버에 연결되었습니다.</li>`;
        ul.insertAdjacentHTML("beforeend", li);
        textInput.disabled=false;
    };
    sock.onclose = () => {};
    sock.onmessage = (e) => {
        let li = `<li>${e.data}</li>`;
        ul.insertAdjacentHTML("beforeend", li);
    };
}

sendBtn.onclick=function(){
    if(!sock)
        return;

    let text = textInput.value;
    sock.send(text);
}