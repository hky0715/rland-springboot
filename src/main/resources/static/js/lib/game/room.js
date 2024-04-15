const gameSection = document.querySelector("#game-section");
const room = gameSection.querySelector(".room");

// ctx의 타입이 뭔지 몰라하니 알려줘야함!
/** @type {CanvasRenderingContext2D} */
const ctx = room.getContext("2d");
ctx.strokeRect(100,100,100,100);


room.onclick = function() {
    
}

