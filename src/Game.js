import { Player } from './Player.js';
import { Background } from './Background.js';
import { Obstacle } from './Obstacle.js';
import { AudioControl } from './Audio.js';

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
        this.sound = new AudioControl();
        this.obstacles = [];
        this.numberOfObstacles = 20;
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
        this.smallFont;
        this.largeFont;
        this.bottomMargin;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX;
        this.swipeDistance = 50;
        this.resize(window.innerWidth, window.innerHeight);

        
        this.resetButton = document.getElementById('resetButton');
        this.resetButton.addEventListener('click', e => {
            this.resize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth,
                e.currentTarget.innerHeight);
        });

        window.addEventListener('mousedown', e => {
            this.player.flap();
        });

        window.addEventListener('mouseup', e => {
            setTimeout(() => {
                this.player.wingsUp();
            }, 50);
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
            if (e.key.toLowerCase() === 'r') {
                this.resize(window.innerWidth, window.innerHeight);
            } 
            if (e.key === 'Enter' || e.key === ' ') {
                this.player.wingsUp();
            }
        });

        canvas.addEventListener('touchstart', e => {
            this.touchStartX = e.changedTouches[0].pageX;
        });

        canvas.addEventListener('touchmove', e => {
            e.preventDefault();
        });

        canvas.addEventListener('touchend', e => {
            if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
                this.player.startCharge();
            } else {
                this.player.flap();
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
        this.ctx.textAlign = 'right';
        this.width = width;
        this.height = height;
        this.ratio = this.height / this.baseHeight;
        this.gravity = 0.15 * this.ratio;
        this.speed = 3 * this.ratio;
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 5;
        this.bottomMargin = Math.floor(50 * this.ratio);
        this.smallFont = Math.ceil(20 * this.ratio);
        this.largeFont = Math.ceil(45 * this.ratio);
        this.ctx.font = this.smallFont + 'px Bungee';
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

    triggerGameOver() {
        if (!this.gameOver) {
            this.gameOver = true;
            if (this.obstacles.length <= 0) {
                this.sound.play(this.sound.win);
                this.message1 = 'Nailed it!';
                this.message2 = 'Can you do it faster than ' + this.formatTimer() + ' seconds?';
            } else {
                this.sound.play(this.sound.lose);
                this.message1 = 'Getting rusty?';
                this.message2 = 'Collision time ' + this.formatTimer() + ' seconds!';
            }
        }
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#fde910';
        this.ctx.fillText('Score: ' + this.score, this.width - this.smallFont, this.largeFont);
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Timer: ' + this.formatTimer(), this.smallFont, this.largeFont);
        if (this.gameOver) {
            this.ctx.textAlign = 'center';
            this.ctx.font = this.largeFont + 'px Bungee';
            this.ctx.fillText(this.message1, this.width * 0.5,
                this.height * 0.5 - this.largeFont, this.width);
            this.ctx.font = this.smallFont + 'px Bungee';
            this.ctx.fillText(this.message2, this.width * 0.5,
                this.height * 0.5 - this.smallFont, this.width);
            this.ctx.fillText('Press R to try again!', this.width * 0.5, this.height * 0.5);
        }

        this.ctx.fillStyle = '#08e8de';
        if (this.player.energy <= this.player.minEnergy) {
            this.ctx.fillStyle = '#f80000';
        }
        if (this.player.energy >= this.player.maxEnergy) {
            this.ctx.fillStyle = '#35c0f8';
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