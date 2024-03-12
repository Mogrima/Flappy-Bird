import { Player } from "./Player.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
    }

    render() {
        this.ctx.fillStyle = 'red';
        this.player.update();
        this.player.draw();
    }
}