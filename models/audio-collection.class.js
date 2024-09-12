class AudioCollection {
  walking_sound = new Audio("audio/pepe_walk.mp3");
  snore_sound = new Audio("audio/snore.mp3");
  jump_sound_character = new Audio("audio/jump_sound_character.mp3");
  coins_pick_sound = new Audio("audio/coins_pick_sound.mp3");
  hurt_sound = new Audio("audio/hurt_sound.mp3");
  pick_bottle = new Audio("audio/pick_bottle.mp3");
  chicken_dead = new Audio("audio/chicken_dead.mp3");
  backgroundAudio = new Audio("audio/background-music.mp3");
  win_sound = new Audio("audio/win_sound.mp3");
  lose_sound = new Audio("audio/lose_sound.mp3");
  bottlesplash = new Audio("audio/bottle_smash.mp3");

  constructor() {
    this.pauseAudio();
  }

  /**
 * Mutes all game audio by setting the volume of each sound to 0.
 * This method affects various sound effects including walking, snoring, jumping, coin picking, hurt sound, bottle picking, and background audio.
 */
  pauseAudio() {
    this.walking_sound.volume = 0;
    this.snore_sound.volume = 0;
    this.jump_sound_character.volume = 0;
    this.coins_pick_sound.volume = 0;
    this.hurt_sound.volume = 0;
    this.pick_bottle.volume = 0;
    this.chicken_dead.volume = 0;
    this.backgroundAudio.volume = 0;
    this.win_sound.volume = 0;
    this.lose_sound.volume = 0;
    this.bottlesplash.volume = 0;
  }

  /**
 * Restores all game audio by setting the volume of each sound back to 1.
 * This method reactivates the same sound effects muted by `pauseAudio()`, such as walking, snoring, jumping, and more.
 */
  playAudio() {
    this.walking_sound.volume = 1;
    this.snore_sound.volume = 1;
    this.jump_sound_character.volume = 1;
    this.coins_pick_sound.volume = 1;
    this.hurt_sound.volume = 1;
    this.pick_bottle.volume = 1;
    this.chicken_dead.volume = 1;
    this.backgroundAudio.volume = 1;
    this.win_sound.volume = 1;
    this.lose_sound.volume = 1;
    this.bottlesplash.volume = 1;
  }
}
