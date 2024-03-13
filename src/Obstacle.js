export class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.scaledHeight;
    }

    update() {
        this.x -= this.game.speed;
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    }

    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
}