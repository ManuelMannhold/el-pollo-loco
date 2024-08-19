class ChickenSmall extends MovableObject {
  width = 60;
  height = 50;
  y = 380;
  isKilled = false;

  IMAGES_WALKING_SMALL = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_SMALL);

    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isKilled) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.energy && this.isKilled) {
        this.energy = false;
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        setTimeout(() => {
          this.spliceChicken(this.getIndexChicken(this));
        }, 1000);
      } else if (!this.isKilled) this.playAnimation(this.IMAGES_WALKING_SMALL);
    }, 200);
  }

  getIndexChicken(obj) {
    for (let i = 0; i < level1.enemies.length; i++) {
      if (level1.enemies[i].x == obj.x) {
        return i;
      }
    }
  }
}
