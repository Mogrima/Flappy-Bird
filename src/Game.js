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
        this.score;
        this.gameOver;
        this.timer;
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

    render(deltaTime) {
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
        this.ctx.font = '15px Bungee';
        this.ctx.textAlign = 'right';
        this.width = width;
        this.height = height;
        this.ratio = this.height / this.baseHeight;
        this.gravity = 0.15 * this.ratio;
        this.speed = 3 * this.ratio;
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

    drawStatusText() {
        this.ctx.save();
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#08e8de';
        this.ctx.fillText('Score: ' + this.score, this.width - 10, 40);
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
}