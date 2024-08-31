let canvas;
let world;
let keyboard = new Keyboard();
gameStart = true;
gameEnd = false;
// let backgroundAudio = new Audio("audio/background-music.mp3");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initLevel();
  console.log("My Charakter is", world.character);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});


function bindButtonPressEvents() {
  document.getElementById('btn-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.LEFT = true;
  });

  document.getElementById('btn-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    this.LEFT = false;
  });

  document.getElementById('btn-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.RIGHT = true;
  });

  document.getElementById('btn-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    this.RIGHT = false;
  });

  document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.D = true;
  });

  document.getElementById('btn-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    this.D = false;
  });

  document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.SPACE = true;
  });

  document.getElementById('btn-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    this.SPACE = false;
  });
}

function startGame() {
  let start = document.getElementById("start");
  let endscreen = document.getElementById("endscreen");

  gameStart = true;
  gameEnd = false;

  if (gameStart) {
    start.classList.add("d-none");
    endscreen.classList.add("d-none");
  }
  // backgroundAudio.play();
  world = null;
  initLevel();
  init();
  document.getElementById("buttons").classList.remove("d-none");
}

function endGame() {
  let start = document.getElementById("start");
  let endscreen = document.getElementById("endscreen");

  gameStart = false;
  gameEnd = true;

  if (gameEnd) {
    start.classList.add("d-none");
    endscreen.classList.remove("d-none");
    this.bindButtonPressEvents();
    // this.backgroundAudio.pause();
  }

  clearAllIntervals();
  document.getElementById("buttons").classList.add("d-none");
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function quitGame() {}

function exitGame() {
  window.ref;
}

function restartGame() {
  world = null;
  initLevel();
  init();
}

function toggleSoundImage() {
  let mute = document.getElementById("mute");
    mute.classList.toggle("mute-on");

  if(mute.classList[1]) {
    backgroundAudio.volume = 0;
  } else if(mute.classList[0]) {
    backgroundAudio.volume = 1;;
  }
}

function fullscreen() {
  let canvas = document.getElementById("canvas-container");

  canvas.requestFullscreen();
}

