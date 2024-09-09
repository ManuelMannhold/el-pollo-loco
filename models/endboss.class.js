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
    left: 8,
    right: 8,
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

  checkBottleHurt() {
    if (this.bottleHurt) {
      this.playAnimation(this.IMAGES_HURT);
      setTimeout(() => {
        this.bottleHurt = false;
        this.attack = true;
      }, 1000);
    } else if (this.attack) {
      this.playAnimation(this.IMAGES_ATTACK);
      this.attackCharacter();
    } else if (this.energy == 0) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          winGame();
          setTimeout(() => {
          window.open('index.html', '_self');
        }, 2000);
      }, 3000);
    } else if (this.energy < 40) {
      this.playAnimation(this.IMAGES_ALERT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

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
      } else 
      this.count = 0;
    }
  }

  attackCharacter() {
    if (this.attack) {
      this.attackCount++;
      this.speed = 3;
      this.moveLeft();
      this.otherDirection = false;
      if (this.attackCount > 200) {
        this.attackCount = 0;
        this.count = 200;
        this.attack = 0;
      }
    } else this.speed = 1.5;
  }
}
