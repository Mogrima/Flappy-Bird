'use strict';
import { Game } from './src/Game.js';

window.addEventListener('load', function () {
    // canvas setup
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, ctx);
    let lastTime = 0;

    // animation loop
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        game.render(deltaTime);
        lastTime = currentTime;
        // if (!game.gameOver) requestAnimationFrame(animate);
        requestAnimationFrame(animate);
    }

    animate(0);

});