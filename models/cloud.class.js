class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = -100 + Math.random() * 4000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
  * Animates the object by continuously moving it to the left.
  *
  * - This function sets up an interval that runs every 10 milliseconds (100 FPS).
  * - It calls the `moveLeft` method to move the object to the left, continuously.
  */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 10)
  }
}
