function startGame() {
    location.href = 'index.html';
}

function quitGame() {
    location.href = 'start-screen.html';
}

function exitGame() {
    window.close;
}

function restartGame() {
    location.href = 'index.html';
}

function toggleSoundImage() {
    let mute = document.getElementById('mute');

    mute.classList.toggle('mute-on');
}