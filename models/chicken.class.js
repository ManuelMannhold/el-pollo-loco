class Chicken extends MovableObject {
  width = 60;
  height = 50;
  y = 380;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
    this.animateChicken();
  }

  animateChicken() {
    setInterval(() => {
      this.x -= 0.5;
    }, 1000 / 60);
  }
}
