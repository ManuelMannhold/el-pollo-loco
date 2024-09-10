class Audio {
    constructor() {
        this.sounds = [];
    }

    addSound(audioFile) {
        const audio = new Audio(audioFile);
        this.sounds.push(audio);
        return audio;
    }

    playSound(sound) {
        sound.play();
    }

    pauseSound(sound) {
        sound.pause();
    }

    muteAll() {
        this.sounds.forEach(sound => {
            sound.muted = true;
        });
    }

    unmuteAll() {
        this.sounds.forEach(sound => {
            sound.muted = false;
        });
    }
}