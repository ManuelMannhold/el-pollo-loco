let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

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

function startGame() {
  document.getElementById('start').classList.add('d-none');
  initLevel();
  init();
}

function quitGame() {
  location.href = 'start-screen.html';
}

function exitGame() {
  window.close;
}

function restartGame() {
  document.getElementById('start').classList.add('d-none');
  init();
}

function toggleSoundImage() {
  let mute = document.getElementById('mute');

  mute.classList.toggle('mute-on');
}

function fullscreen() {
  let canvas = document.getElementById('canvas');

  canvas.requestFullscreen();
}
