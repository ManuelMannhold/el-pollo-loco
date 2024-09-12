let canvas;
let world;
let audio;
let keyboard = new Keyboard();

gameStart = true;
gameEnd = false;
let backgroundAudio = new Audio("audio/background-music.mp3");
let win_sound = new Audio("audio/win_sound.mp3");
let lose_sound = new Audio("audio/lose_sound.mp3");

/**
 * Initializes the game environment.
 * 
 * - Sets up the canvas, audio, and world.
 * - Calls `initLevel` to set up the game level.
 * - Calls `handleOrientation` to configure controls based on screen orientation.
 */
function init() {
  canvas = document.getElementById("canvas");
  audio = new AudioCollection();
  world = new World(canvas, keyboard, audio);
  initLevel();
  handleOrientation();
}

/**
 * Handles keyboard input for game controls.
 * 
 * - Adds event listeners for keydown and keyup events to update the `keyboard` object.
 */
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

/**
 * Sets up touch event listeners for virtual buttons (left, right, throw, and jump) to control the game.
 * 
 * - Each button registers 'touchstart' and 'touchend' events that correspond to specific keyboard actions.
 * - Prevents default browser behavior on cancelable touch events to ensure proper game input handling.
 */
function buttonPressEvents() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.D = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.D = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.SPACE = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.SPACE = false;
  });
}

/**
 * Handles screen orientation changes to set appropriate controls.
 * 
 * - Configures controls based on whether the device is in landscape or portrait mode.
 */
function handleOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    keyboardSteering();
  } else if (window.matchMedia("(orientation: portrait)").matches) {
    buttonPressEvents();    
  }
}

window.addEventListener("resize", handleOrientation);
window.addEventListener("orientationchange", handleOrientation);
handleOrientation();

/**
 * Starts the game.
 * 
 * - Initializes game elements and starts background audio.
 * - Updates UI to show game buttons and hide start/end screens.
 */
function startGame() {
  let start = document.getElementById("start");
  let endscreen = document.getElementById("endscreen");
  gameStart = true;
  gameEnd = false;
  if (gameStart) {
    start.classList.add("d-none");
    endscreen.classList.add("d-none");
  }
  world = null;
  initLevel();
  init();
  backgroundAudio.play();
  backgroundAudio.volume = 0.25;
  world.audios.playAudio();
  document.getElementById("buttons").classList.remove("d-none");
}

function showRules() {
    document.getElementById('game-rules').classList.remove('d-none');
}

function closeRules() {
  document.getElementById('game-rules').classList.add('d-none');
}

/**
 * Ends the game and displays the end screen.
 * 
 * - Updates UI to show the end screen, plays lose sound, and sets a timeout to reload the game.
 */
function endGame() {
  let start = document.getElementById("start");
  let endscreen = document.getElementById("endscreen");
  gameStart = false;
  gameEnd = true;
  if (gameEnd) {
    start.classList.add("d-none");
    endscreen.classList.remove("d-none");
    world.audios.pauseAudio();
  }
}

/**
 * Restart the game by resetting the world, re-initializing the level and game settings, 
 * and starting the background audio with a set volume.
 * 
 * The function performs the following steps:
 * 1. Clears the current game state by setting `world` to null.
 * 2. Re-initializes the game level by calling `initLevel()`.
 * 3. Re-initializes the game environment, including the canvas, keyboard controls, and audio, by calling `init()`.
 * 4. Starts the background music playback and sets its volume to 25%.
 * 5. Ensures that all game-related sounds are reactivated through the world's audio system.
 */
function restartGame() {
  world = null;
  initLevel();
  init();
  backgroundAudio.play();
  backgroundAudio.volume = 0.25;
  world.audios.playAudio();
  document.getElementById('endscreen').classList.add('d-none');
}

/**
 * Handles the win condition by displaying the win screen and playing win sound.
 * 
 * - Stops all intervals and hides game buttons.
 */
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

/**
 * Displays the imprint section.
 * 
 * - Removes the 'd-none' class from the element with the ID 'imprint' to make it visible.
 */
function openImprint() {
  document.getElementById('imprint').classList.remove('d-none');
}

/**
 * Hides the imprint section.
 * 
 * - Adds the 'd-none' class to the element with the ID 'imprint' to make it invisible.
 */
function closeImprint() {
  document.getElementById('imprint').classList.add('d-none');
}

/**
 * Clears all intervals to stop ongoing game processes.
 * 
 * - Iterates through a large number of interval IDs and clears them.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Restarts the game by reinitializing all game elements and levels.
 * 
 * - Hides the end screen, clears all intervals, and calls initialization functions.
 */
function restartGame() {
  document.getElementById("endscreen").classList.add("d-none");
  clearAllIntervals();
  world = null;
  initLevel();
  init();
  backgroundAudio.play();
  backgroundAudio.volume = 0.25;
  world.audios.playAudio();
}

/**
 * Quits the current game and redirects the user to the homepage (index.html).
 * 
 * - This function opens the 'index.html' file in the same browser tab by using '_self' as the target.
 * - It simulates quitting or ending the game and bringing the user back to the main page.
 */
function quitGame() {
  window.open('index.html', '_self')
}

/**
 * Shows the imprint or information section of the game.
 * 
 * - Displays the imprint or info section by removing the 'd-none' class.
 */
function showImprint() {
  document.getElementById('button-container-info').classList.remove('d-none');
}

/**
 * Toggles the sound settings for the game.
 * 
 * - Mutes or unmutes the background audio and sound effects based on the mute button's state.
 */
function toggleSoundImage() {
  let mute = document.getElementById("mute");
  mute.classList.toggle("mute-on");

  if (mute.classList[1]) {
    backgroundAudio.volume = 0;
    world.audios.pauseAudio();
    backgroundAudio.volume = 0;
    win_sound.volume = 0;
    lose_sound.volume = 0;
  } else if (mute.classList[0]) {
    backgroundAudio.volume = 1;
    world.audios.playAudio();
    backgroundAudio.volume = 0.25;
    win_sound.volume = 1;
    lose_sound.volume = 1;
  }
}
