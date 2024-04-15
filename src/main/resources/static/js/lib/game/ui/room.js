import Boy from '../item/boy.js';
export default class Room {
    #img
    #ctx
    #boy
    #canvas
    constructor() {
        const gameSection = document.querySelector("#game-section");
        this.#canvas = gameSection.querySelector(".room");
        this.#canvas.onclick = this.clickHandler.bind(this);

        // ctx의 타입이 뭔지 몰라하니 알려줘야함!
        /** @type {CanvasRenderingContext2D} */
        this.#ctx = this.#canvas.getContext("2d");

        this.#img = new Image();
        this.#img.src = './res/map.png';

        this.#boy = new Boy();
    }

    clickHandler(e) {
        // this.#boy.move(e.clientX, e.clientY);
        this.#boy.move(e.x, e.y);
        this.#boy.draw(this.#ctx);

    }

    draw() {
        // 1. 위치, 2. 위치+크기, 3. 크기 및 src->dest까지의 위치 변경 가넝
        // this.ctx.drawImage(this.#img,
        //     0, 0, 200, 200,
        //     100, 100, 200, 200
        // );
        //
        // this.ctx.drawImage(this.#img,
        //     200, 200, 200, 200,
        //     300, 300, 200, 200
        // );
        this.#ctx.drawImage(this.#img, 0, 0);
        // boy에게 context canvas를 주자...
        this.#boy.draw(this.#ctx);
    }

    update() {

    }
}