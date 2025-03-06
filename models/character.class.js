class Character extends MovableObject {
  height = 230;
  y = 210;
  world;
  speed = 10;
  animationFrame = 0;
  lastAction = 0;
  isJump = false;
  endHurt = false;
  isSleep = false;
  bottle = new Bottle();
  offset = {
    top: 104,
    bottom: 0,
    left: 20,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravitiy();
    this.animate();
  }

  /**
   * Continuously animates the character by setting up various intervals to handle
   * walking, jumping, movement, and other character states such as being hurt or dead.
   *
   * The function performs the following actions:
   * 1. Sets up an interval to handle the character's walking animation, executed every 12 milliseconds.
   * 2. Sets up an interval to handle the character's dead state, jumping, movement, and hurt state checks, executed every 150 milliseconds.
   * 3. Sets up a longer interval to stop certain animations after 6000 milliseconds.
   *
   * Note: Multiple intervals are used to independently control different aspects of the character's animation and state.
   */
  animate() {
    setInterval(() => {
      this.walkingFunctionInterval();
    }, 12);
    setInterval(() => {
      this.deadFunctionInterval();
      this.checkJump();
      this.checkMovement();
      this.ifIsHurt();
    }, 150);
    setInterval(() => {
      this.stopAnimation();
    }, 6000);
  }

  /**
   * Checks if the object is hurt, and if so, plays the hurt animation.
   * Sets the `endHurt` flag to true after the animation.
   */
  ifIsHurt() {
    if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    this.endHurt = true;
  }

  /**
   * Handles character movement based on keyboard input.
   * Moves the character left or right, makes the character jump if spacebar is pressed,
   * and adjusts the camera's x-coordinate to follow the character.
   */
  walkingFunctionInterval() {
    let endBossPosition = this.world.endboss.x;
    let isMoving = false;

    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      this.x < endBossPosition
    ) {
      this.moveRight();
      this.otherDirection = false;
      isMoving = true;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.isJump = true;
      this.jump();
      this.endHurt = false;
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Continuously checks if the character is dead and, if so, plays the death animation.
   * Ends the game after 1 second once the death animation starts.
   */
  deadFunctionInterval() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        endGame();
      }
    }, 300);
  }

  /**
   * Checks for character movement (left or right) and plays the walking animation.
   * Stops the animation if no movement is detected.
   */
  checkMovement() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.isJump = false;
    } else {
      this.stopAnimation();
    }
  }

  /**
   * Handles the jump logic when the spacebar is pressed.
   * Plays the jumping animation while the character is in the air.
   * Resets the jump state when the character is back on the ground.
   */
  checkJump() {
    if (this.world.keyboard.SPACE && !this.isJump && !this.isAboveGround()) {
      this.isJump = true;
      this.world.audios.jump_sound_character.play();
      this.jump();
    }

    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }

    if (!this.isAboveGround() && this.isJump) {
      this.isJump = false;
    }
  }

  /**
   * Stops any movement-related animations and plays the idle animation if the character is not moving.
   * Plays the sleep animation if the character has been idle for more than 5 seconds.
   */
  stopAnimation() {
    this.lastAction = new Date().getTime();
    let timePassed = new Date().getTime() - this.lastAction;
    timePassed = timePassed / 1000;
    let isMoving = false;

    if (
      !isMoving &&
      !this.isJump &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT
    ) {
      this.playAnimation(this.IMAGES_IDLE);
    } else if (timePassed > 5 && isMoving) {
      this.playAnimation(this.IMAGES_SLEEP);
      this.world.audios.snore_sound.play();
      this.isSleep = true;
    } else {
      !this.isSleep;
      this.world.audios.snore_sound.pause();
    }
  }
}
