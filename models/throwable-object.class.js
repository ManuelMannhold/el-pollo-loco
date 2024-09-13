class ThrowableObject extends MovableObject {
  speedY = 30;
  speedX = 20;
  world;

  IMAGES_BOTTLE_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.world = world;
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;
    this.throw();
    this.animate();
  }

  /**
   * Simulates throwing an object (e.g., a bottle) and handles its animation and interactions.
   *
   * - Sets the vertical speed (`speedY`) to initiate the throw and applies gravity to simulate the object falling.
   * - Uses a `setInterval` to repeatedly update the object's position and animation.
   * - Checks if the object is in the air and whether it should play the rotating bottle animation.
   * - Adjusts the object's horizontal movement based on the character's direction.
   * - Triggers a splash effect if the object hits the ground or collides with an enemy or the boss.
   * - Sets flags and updates game state accordingly, including marking the bottle as splashed and updating whether the bottle is on the ground.
   */
  throw() {
    this.speedY = 30;
    this.applyGravitiy();
    let splashed = false;
    setInterval(() => {
      if (!world.splashedBottle && !splashed && !world.character.otherDirection) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        this.x += 8;
      } else if (world.character.otherDirection) {
        this.x -= 8;
      }
      if (this.y >= 360 && !splashed) this.triggerSplash(), splashed = true, world.bottleOnGround = false;
      if (this.hitsEnemy() || this.hitsBoss()) this.triggerSplash(), splashed = true;
    }, 25);
  }

  /**
  * Checks if the thrown bottle collides with any enemy in the level.
  * 
  * - Iterates over all enemies to see if the bottle is colliding with any of them.
  * 
  * @returns {boolean} True if the bottle hits an enemy, false otherwise.
  */
  hitsEnemy() {
    return world.level.enemies.some(enemy => this.isColliding(enemy));
  }

  /**
  * Checks if the thrown bottle collides with the boss.
  * 
  * - Uses the `isColliding` method to determine if the bottle hits the boss.
  * 
  * @returns {boolean} True if the bottle hits the boss, false otherwise.
  */
  hitsBoss() {
    return this.isColliding(world.endboss);
  }

  /**
  * Triggers the splash animation and plays the splash sound effect when the bottle hits an enemy, boss, or the ground.
  * 
  * - The splash animation is loaded and played.
  * - The bottle's horizontal position is adjusted slightly to simulate the impact.
  */
  triggerSplash() {
    this.loadImages(this.IMAGES_SPLASH);
    this.playAnimation(this.IMAGES_SPLASH);
    world.audios.bottlesplash.play();
    this.x -= 8;
  }

  /**
  * Animates the bottle splash after it hits the ground or an enemy.
  * 
  * - The splash animation plays if the `splashedBottle` flag is true.
  */
  animate() {
    if (world.splashedBottle == true) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 50);
    }
  }
}
