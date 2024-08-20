class Chicken extends MovableObject {
  width = 60;
  height = 50;
  y = 380;
  energy = true;
  isKilled = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }

  IMAGES_WALKING_BIG = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ]

  walking_sound = new Audio("audio/chicken_walk.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_BIG);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if(!this.isKilled) 
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.energy && this.isKilled) {
        this.energy = false;
        this.isKilled = true;
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        setTimeout(() => {
          this.spliceChicken(this.getIndexChicken(this));
        }, 1000);
      }
      else if (!this.isKilled)
        this.playAnimation(this.IMAGES_WALKING_BIG);
    }, 200);
  }

  spliceChicken(i) {
    level1.enemies.splice(i, 1); 
  }

  getIndexChicken(obj) {
    for (let i = 0; i < level1.enemies.length; i++) {
      if (level1.enemies[i].x == obj.x) {
        return i;
      }
    }
  }
}
