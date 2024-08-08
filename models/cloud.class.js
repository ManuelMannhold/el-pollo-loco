class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = -100 + Math.random() * 2400;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval( () => {
      this.moveLeft();
    }, 10 )
  }
}
