import { Particle } from './Partical.js';
import { Explosion } from './Explosion.js';

export class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.scaledHeight;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.speedY = Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.markedForDeletion = false;
        this.image = document.getElementById('smallGears');
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = 0;
    }

    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;
        this.collisionX = this.x + this.scaledWidth * 0.5;
        this.collisionY = this.y + this.scaledHeight * 0.5;
        if (!this.game.gameOver) {
            if (this.y <= 0 || this.y >= this.game.height - this.scaledHeight) {
                this.speedY *= -1;
            }
        } else {
            this.speedY += 0.1;
        }

        if (this.isOffScreen()) {
            this.remove();
            if (!this.game.gameOver) this.game.score++;
            if (this.game.obstacles.length <= 0) {
                this.game.triggerGameOver();
            }
        }

        if (this.game.checkCollision(this, this.game.player)) {
            this.game.player.collided = true;
            this.remove();
            this.game.particles.add(new Explosion(this.game,
                this.x + this.scaledWidth * 0.5, this.y + this.scaledHeight * 0.5));
            for (let i = 0; i < this.game.player.numberOfParticles; i++) {
                this.game.particles.add(new Particle(this.game,
                    this.game.player.x + this.game.player.width * 0.5,
                    this.game.player.y + this.game.player.height * 0.5));
            }
            this.game.player.stopCharge();
            this.game.triggerGameOver();
        }
    }

    draw() {
        this.game.ctx.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.scaledWidth, this.scaledHeight);
        if (this.game.debug) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            this.game.ctx.stroke();
        }
    }

    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.collisionRadius = this.scaledWidth * 0.4;
    }

    isOffScreen() {
        return this.x < -this.scaledWidth || this.y > this.game.height;
    }

    remove() {
        this.markedForDeletion = true;
        this.game.obstacles = this.game.obstacles.filter(obstacle =>
            !obstacle.markedForDeletion);
    }
}