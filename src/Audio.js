export class AudioControl {
    constructor() {
        this.charge = document.getElementById('charge');
        this.flap1 = document.getElementById('flap1');
        this.flap2 = document.getElementById('flap2');
        this.flap3 = document.getElementById('flap3');
        this.flap4 = document.getElementById('flap4');
        this.flap5 = document.getElementById('flap5');
        this.flapSounds = [this.flap1, this.flap2,
            this.flap3, this.flap4, this.flap5];
        this.lose = document.getElementById('lose');
        this.win = document.getElementById('win');
        this.mainTheme = document.getElementById('main');
    }

    play(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    mainSound() {
        this.mainTheme.currentTime = 0;
        this.mainTheme.loop = true;
        this.mainTheme.volume = 0.3;
        this.mainTheme.play();
    }
}