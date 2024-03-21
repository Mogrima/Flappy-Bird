export class AudioControl {
    constructor() {
        this.charge = document.getElementById('charge');
        this.flap1 = document.getElementById('flap1');
    }

    play(sound) {
        sound.currentTime = 0;
        sound.play();
    }
}