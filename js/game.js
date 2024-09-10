let canvas;
let world;
let keyboard = new Keyboard();

gameStart = true;
gameEnd = false;
// let backgroundAudio = new Audio("audio/background-music.mp3");
let win_sound = new Audio("audio/win_sound.mp3");
let lose_sound = new Audio("audio/lose_sound.mp3");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initLevel();
  handleOrientation();
  console.log("My Charakter is", world.character);
}

function keyboardSteering() {
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
}

function buttonPressEvents() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

function handleOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    keyboardSteering();
    console.log("Querformat - Tastatursteuerung aktiviert");
  } else if (window.matchMedia("(orientation: portrait)").matches) {
    buttonPressEvents();
    console.log("Hochformat - Button-Steuerung aktiviert");
  }
}

window.addEventListener("resize", handleOrientation);
window.addEventListener("orientationchange", handleOrientation);
handleOrientation();

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
      lose_sound.play();
      setTimeout(() => {
        window.open("index.html", "_self")
      }, 1500);
    // this.backgroundAudio.pause();
  }
}

function winGame() {
  let win = document.getElementById("winscreen");

  gameWin = true;

  if (gameWin) {
    win.classList.remove("d-none");
    win_sound.play();
  }

  clearAllIntervals();
  document.getElementById("buttons").classList.add("d-none");
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function quitGame() {
  window.open('index.html', '_self');
}

function restartGame() {
  document.getElementById('endscreen').classList.add('d-none');
  clearAllIntervals();
  world = null;
  initLevel();
  init();
}

function toggleSoundImage() {
  let mute = document.getElementById("mute");
  mute.classList.toggle("mute-on");

  if (mute.classList[1]) {
    backgroundAudio.volume = 0;
  } else if (mute.classList[0]) {
    backgroundAudio.volume = 1;
  }
}
