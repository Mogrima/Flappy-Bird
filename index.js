'use strict';
import { Game } from './src/Game.js';

window.addEventListener('load', function () {
    // canvas setup
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    let lastTime = 0;

    // animation loop
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        lastTime = currentTime;
        if (!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);

});