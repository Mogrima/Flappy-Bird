export class Explosion {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('smokeExplosion');
        this.frameX = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.maxFrame = 8;
    }
    update() {
        this.x -= this.game.speed;
        if (this.game.eventUpdate) {
            this.frameX++;
        }
        if (this.frameX > this.maxFrame) this.remove();
    }
    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight, this.x, this.y,
            this.width, this.height);
    }

    remove() {
        this.game.particles.delete(this);
    }
}