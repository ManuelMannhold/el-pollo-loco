class Bottle extends MovableObject {
  y = 360;
  bottles = [];
  width = 60;
  height = 80;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 3600;
    this.animate();
    // this.bottleSplash();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 500);
  }

  getIndexBottles(obj) {
    for (let i = 0; i < level1.bottles.length; i++) {
      if (level1.bottles[i].x == obj.x) {
        console.log(i);
        return i;
      }
    }
  }

  // bottleSplash() {
  //   if (this.bottles.isColliding(!this.isAboveGround)) {
  //     this.throwableObject.splice(-1, 1)
  //   }
  // };
}
