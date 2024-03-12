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
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {}
}