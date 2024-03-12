import { Player } from "./Player.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        // сила тяжести в 1px на каждый кадр анимации
        this.gravity;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth,
                e.currentTarget.innerHeight);
        });
    }

    render() {
        this.player.update();
        this.player.draw();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'red';
        this.width = width;
        this.height = height;
        this.ratio = this.height / this.baseHeight;
        this.gravity = 0.15 * this.ratio;
        this.player.resize();
    }
}