import { Player } from "./Player.js";
import { Background } from "./Background.js";
import { Obstacle } from "./Obstacle.js";

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
        this.obstacles = [];
        this.numberOfObstacles = 10;
        // сила тяжести в 1px на каждый кадр анимации
        this.gravity;
        this.speed;
        this.minSpeed;
        this.maxSpeed;
        this.score;
        this.gameOver;
        this.timer;
        this.message1;
        this.message2;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX;
        this.swipeDistance = 50;
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth,
                e.currentTarget.innerHeight);
        });

        window.addEventListener('mousedown', e => {
            this.player.flap();
        });

        window.addEventListener('mouseup', e => {
            this.player.wingsUp();
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.player.flap();
            }
            if (e.key === 'Shift' || e.key.toLowerCase() === 'c') {
                this.player.startCharge();
            }
        });

        window.addEventListener('keyup', e => {
            this.player.wingsUp();
        });

        window.addEventListener('touchstart', e => {
            this.player.flap();
            this.touchStartX = e.changedTouches[0].pageX;
        });

        canvas.addEventListener('touchmove', e => {
            if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
                this.player.startCharge();
            }
        });
    }

    render(deltaTime) {
        if (!this.gameOver) this.timer += deltaTime;
        this.handlePeriodicEvents(deltaTime);
        this.background.update();
        this.background.draw();
        this.drawStatusText();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'blue';
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'white';
        this.ctx.font = '15px Bungee';
        this.ctx.textAlign = 'right';
        this.width = width;
        this.height = height;
        this.ratio = this.height / this.baseHeight;
        this.gravity = 0.15 * this.ratio;
        this.speed = 3 * this.ratio;
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 5;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
    }

    formatTimer() {
        return (this.timer * 0.001).toFixed(1);
    }

    handlePeriodicEvents(deltaTime) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventUpdate = true;
            this.eventTimer = this.eventTimer % this.eventInterval;
        }
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#08e8de';
        this.ctx.fillText('Score: ' + this.score, this.width - 10, 40);
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Timer: ' + this.formatTimer(), 10, 40);
        if (this.gameOver) {
            if (this.player.collided) {
                this.message1 = 'Getting rusty?';
                this.message2 = 'Collision time ' + this.formatTimer() + ' seconds!';
            } else if (this.obstacles.length <= 0) {
                this.message1 = 'Nailed it!';
                this.message2 = 'Can you do it faster than ' + this.formatTimer() + ' seconds?';
            }
            this.ctx.textAlign = 'center';
            this.ctx.font = '30px Bungee';
            this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5 - 40);
            this.ctx.font = '15px Bungee';
            this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5 - 20);
            this.ctx.fillText('Press R to try again!', this.width * 0.5, this.height * 0.5);
        }

        for (let i = 0; i < this.player.energy; i++) {
            this.ctx.fillRect(10, this.height - 10 - this.player.barSize * i,
                this.player.barSize * 5, this.player.barSize);
        }
        this.ctx.restore();
    }

    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this,
                firstX + i * obstacleSpacing));
        }
    }

    checkCollision(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadius = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadius;
    }
}