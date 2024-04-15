export default class Boy {
    #name
    #x
    #y
    #w
    #h
    #img
    #moveIndex
    #dirIndex


    constructor() {
        this.#img = new Image();
        this.#img.src = './res/boy.png';
        this.#w = this.#img.width/3;
        this.#h = this.#img.height/4;
        this.#x = 0;
        this.#y = 0;
        this.#moveIndex = 1;
        this.#dirIndex = 2;
    }

    // ------ animation -------
    /** @type {CanvasRenderingContext2D} */
    draw(ctx) {
        let mi = this.#moveIndex;
        let di = this.#dirIndex;

        let w = this.#w;
        let h = this.#h;

        let sx = (w*mi);
        let sy = (h*di);

        let dx = this.#x-w/2;
        let dy = this.#y-h/2;

        ctx.drawImage(this.#img,
            //source
            sx,sy,w,h,
            //destination
            dx,dy,w,h);
    }

    update() {

    }

    // -------- acting --------
    move(x, y) {
        this.#x = x;
        this.#y = y;
    }

    moveBy(dir) {

    }
}