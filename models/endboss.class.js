class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  width = 300;
  height = 500;
  y = -30;
  energy = 100;
  bottleHurt = false;
  attack = false;
  attackCount = 0;
  count = false;
  offset = {
    top: 64,
    bottom: 16,
    left: 48,
    right: 48,
  };

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 4000;
    this.speed = 0.85 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.checkBottleHurt();
    }, 400);

    setInterval(() => {
      this.moveEndboss();
    }, 1000 / 60);

    setInterval(() => {
      this.attackCharacter();
    }, 10);
  }

  /**
  * Handles character state based on energy level and whether the character was hurt by a bottle.
  * 
  * - If the character is hurt by a bottle (`bottleHurt`) and has remaining energy, it plays the hurt animation and temporarily disables attack.
  * - If the character is ready to attack (`attack`), it plays the attack animation and triggers the attack.
  * - If the character's energy reaches 0, it plays the death animation and triggers the win condition after 3 seconds.
  * - If the character's energy is below 40 but greater than 0, it plays an alert animation; otherwise, it plays the walking animation.
  */
  checkBottleHurt() {
    if (this.bottleHurt && this.energy > 0) {
      this.playAnimation(this.IMAGES_HURT);
      setTimeout(() => { this.bottleHurt = false; this.attack = true; }, 1000);
    } else if (this.attack) {
      this.playAnimation(this.IMAGES_ATTACK);
      this.attackCharacter();
    } else if (this.energy == 0) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => { winGame() }, 3000);
    } else {
      this.playAnimation(this.energy < 40 ? this.IMAGES_ALERT : this.IMAGES_WALKING);
    }
  }

  /**
   * Controls the movement pattern of the endboss based on its energy and attack status.
   * 
   * - Moves the boss left for 200 counts, then moves it right for the next 200 counts.
   * - Resets the movement cycle after 400 counts.
   * - The boss only moves when its energy is above 0 and it's not attacking.
   */
  moveEndboss() {
    if (this.energy > 0 && !this.attack) {
      if (this.count < 200) {
        this.count++;
        this.moveLeft();
        this.otherDirection = false;
      } else if (this.count < 400) {
        this.count++;
        this.moveRight();
        this.otherDirection = true;
      } else this.count = 0;
    }
  }

  /**
 * Manages the boss's attack behavior.
 * 
 * - Increases the boss's speed during an attack and moves it left.
 * - Plays the walking animation after 200 attack counts and resets the attack state.
 * - Restores normal speed when the boss is not attacking.
 */
  attackCharacter() {
    if (this.attack) {
      this.attackCount++;
      this.speed = 3;
      this.moveLeft();
      this.otherDirection = false;
      if (this.attackCount > 200) {
        this.playAnimation(this.IMAGES_WALKING);
        this.attackCount = 0;
        this.count = 200;
        this.attack = 0;
      }
    } else this.speed = 1.5;
  }
}
