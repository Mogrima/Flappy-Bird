export class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        // базовая ширина и высота - размер спрайта
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width;
        this.height;
        this.speedY;
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {}

    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height;
        this.speedY = -8 * this.game.ratio;
    }

    isTouchingBottom() {
        return this.y >= this.game.height - this.height;
    }
}