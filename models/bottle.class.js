class Bottle extends MovableObject {
  y = 360;
  bottles = [];
  width = 60;
  height = 80;

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  IMAGES_BOTTLE_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 2000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 500);
  }

    spliceBottle(index){
      level1.bottles.splice(index, 1);
    }

    getIndexBottles(obj) {
      for (let i = 0; i < level1.bottles.length; i++) {
        if (level1.bottles[i].x == obj.x) {
          console.log(i);
          return i;
        }
      }
    }
  }