export class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('gears');
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 50;
        this.sizeModifer = (Math.random() * 0.9 + 0.9).toFixed(1);
        this.size = (this.spriteSize * this.sizeModifer) * this.game.ratio;
        this.speedX = (Math.random() * 6 - 6) * this.game.ratio;
        this.speedY =(Math.random() * - 15) * this.game.ratio;
        this.gravity = 0.5 * this.game.ratio;
        this.angle = 0;
        this.va = (Math.random() * 0.3 - 0.1) * this.game.ratio;
        this.bounced = 0;
        this.bottomBounceBoundary = 150 * this.game.ratio;
    }

    resize() {
        this.size = (this.spriteSize * this.sizeModifer) * this.game.ratio;
        this.speedX = (Math.random() * 6 - 3) * this.game.ratio;
        this.speedY = (Math.random() * - 15) * this.game.ratio;
        this.gravity = 0.5 * this.game.ratio;
        this.angle = 0;
        this.va = (Math.random() * 0.2 - 0.1) * this.game.ratio;
    }

    update() {
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
            this.remove()
        }
        if (this.y > this.game.height - this.size - this.bottomBounceBoundary && this.bounced < 4) {
            this.bounced++;
            this.speedY *= -0.5;
        }
    }
    draw() {
        this.game.ctx.save();
        this.game.ctx.translate(this.x, this.y);
        this.game.ctx.rotate(this.angle);
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
            this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
        this.game.ctx.restore();
    }

    remove() {
        this.game.particles.delete(this);
    }
}