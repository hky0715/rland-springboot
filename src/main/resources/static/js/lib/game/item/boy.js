export default class Boy {
    #name
    #x
    #y
    #w
    #h
    #vx
    #vy
    #dx
    #dy
    #img
    #moveIndex
    #dirIndex
    #moveIndexCount


    constructor() {
        this.#img = new Image();
        this.#img.src = './res/boy.png';
        this.#w = this.#img.width/3;
        this.#h = this.#img.height/4;
        this.#x = 100;
        this.#y = 100;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.#x;
        this.#dy = this.#y;
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
        console.log(this.#dx, ",", this.#dy);
        this.#x += this.#vx;
        this.#y += this.#vy;

        /* 정확하게 딱 x!!!!가 되지 않으니까.... 컴터는 소수점은 무한대로 표현할 수 없어서
        소수점을 날려먹으면서 편차가 생기고ㅠ 오차가 생기고...
        if (this.#dx == this.#x && this.#dy == this.#dy) {
            this.#vx = 0;
            this.#vy = 0;
        }*/

        if(this.#dx > this.#x)
            console.log(this.#x, this.#dx);

        if(Math.floor(this.#x) == this.#dx || Math.floor(this.#y) == this.dx) {
            this.#vx = 0;
            this.#vy = 0;
            this.#dirIndex = 2;
            this.#moveIndex = 1; // 멈춤 이미지
            this.#moveIndexCount = 10;
        }
        else {
            if(this.#moveIndexCount-- == 0) {
                this.#moveIndex = this.#moveIndex == 0 ? 2 : 0;
                this.#moveIndexCount = 10;
            }
        }
    }

    // -------- acting --------
    move(x, y) {
        // this.#x = x;
        // this.#y = y;

        let w = x - this.#x;
        let h = y - this.#y;

        let d = Math.sqrt(w*w + h*h);
        this.#vx = w/d;
        this.#vy = h/d;
        this.#dx = x;
        this.#dy = y;

        if(Math.abs(w) > Math.abs(h)){
            if(w<0)
                this.#dirIndex = 3;
            else
                this.#dirIndex = 1;
        }
        else{
            if(h<0)
                this.#dirIndex = 0;
            else
                this.#dirIndex = 2;
        }

        console.log(this.#vx,",",this.#vy);

    }

    moveBy(dir) {

    }
}