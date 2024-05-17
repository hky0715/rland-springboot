window.addEventListener("load", function() {
    const chatWindow = this.document.querySelector("#chat-window");
    const connButton = chatWindow.querySelector(".btn-conn");
    const textInput = chatWindow.querySelector("input[type=text]");
    const ul = chatWindow.querySelector("ul");

    connButton.onclick = function() {
        const socket = new WebSocket("ws://localhost:8080/chat");
        socket.onopen = ()=>{
            let li = `<li>서버에 접속되었습니다!</li>`;
            ul.insertAdjacentHTML("beforeend", li);
            textInput.disabled = false;
        };
        socket.onclose = ()=>{};
        socket.onmessage = (e)=>{
            let li = `<li>${e.data}</li>`
            ul.insertAdjacentHTML("beforeend", li);
        };

    }
})