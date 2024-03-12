import { Player } from "./Player.js";
import { Background } from "./Background.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this);
        // сила тяжести в 1px на каждый кадр анимации
        this.gravity;
        this.speed;
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth,
                e.currentTarget.innerHeight);
        });

        window.addEventListener('mousedown', e => {
            this.player.flap();
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.player.flap();
            }
        });

        window.addEventListener('touchstart', e => {
            this.player.flap();
        });
    }

    render() {
        this.background.update();
        this.background.draw();
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
        this.speed = 3;
        this.background.resize();
        this.player.resize();
    }
}