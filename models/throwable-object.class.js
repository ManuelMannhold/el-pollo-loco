class ThrowableObject extends MovableObject {
  speedY = 30;
  speedX = 20;
  bottlesplash = new Audio("audio\bottle_smash.mp3");

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

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;
    this.throw();
    this.animate();
  }

  throw() {
    this.speedY = 30;
    this.applyGravitiy();
    setInterval(() => {
      if (world.splashedBottle == false) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
      }
      this.x += 8;
      if (this.y >= 360) {
        world.bottleOnGround = true;
        this.loadImages(this.IMAGES_SPLASH);
        console.log("splash");
        this.x -= 8;
      } else {
        world.bottleOnGround = false;
      }
    }, 25);
  }

  animate() {
    if (world.splashedBottle == true) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 50);
    }
  }
}
