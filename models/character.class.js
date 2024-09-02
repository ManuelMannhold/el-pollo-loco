class Character extends MovableObject {
  height = 230;
  y = 210;
  world;
  speed = 10;
  walking_sound = new Audio("audio/pepe_walk.mp3");
  snore_sound = new Audio("audio/snore.mp3");
  jump_sound_character = new Audio("audio/jump_sound_character.mp3");
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

  animate() {
    setInterval(() => {
      this.walkingFunctionInterval();
    }, 12);
    setInterval(() => {
      this.deadFunctionInterval();
      this.checkMovement();
      this.checkJump();
    }, 150);
    this.stopAnimation();
  }



  ifIsHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.endHurt = true;
  }

  walkingFunctionInterval() {
    this.walking_sound.pause();
    let isMoving = false;

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.walking_sound.play();
      this.walking_sound.volume = 1;
      isMoving;
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
      this.walking_sound.volume = 1;
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.isJump = true;
      this.jump();
      this.endHurt = false;
    }
    this.world.camera_x = -this.x + 100;

    // if (isMoving) {
    //     this.playAnimation(this.IMAGES_WALKING);
    //   this.walking_sound.play();
    // } else {
    //   this.playAnimation(this.IMAGES_IDLE); 
    //   this.walking_sound.pause();
    // }
  }

  deadFunctionInterval() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          endGame();
        }, 1000);
        if (this.isHurt()) {
          this.ifIsHurt();
        }
        // } else if (this.isAboveGround()) {
        //   this.playAnimation(this.IMAGES_JUMPING);
        // } else {

        // }
      }
    }, 1000);
  }

  checkMovement() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.isJump = false;
    } else {
      this.stopAnimation();
    }
  }

  checkJump() {
    if (this.world.keyboard.SPACE && !this.isJump && !this.isAboveGround()) {
      this.isJump = true; 
      this.jump_sound_character.play();
      this.jump();
    }
  
    if (this.isAboveGround()) {
      this.isJump = false;
      this.playAnimation(this.IMAGES_JUMPING);
    }
    if (!this.isAboveGround()) {
      this.isJump = false;
    }
  }
  

    stopAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.ifTimepassedForSleep();
    }

    ifTimepassedForSleep() {
      let timePassed = new Date().getTime() - this.lastAction;
      timePassed = timePassed / 1000;

      if (timePassed > 5 && this.isMoving) {
        this.playAnimation(this.IMAGES_SLEEP);
        this.snore_sound.play();
        this.isSleep = true;
      } else {
        !this.isSleep;
        this.snore_sound.pause();
      }
    }
  }
