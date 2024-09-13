class Coins extends MovableObject {
  y = 100;
  coins = [];
  offset = {
    top: 0,
    bottom: 40,
    left: 0,
    right: 0
  }
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);

    this.x = 200 + Math.random() * 3600;
    this.y = 0 + Math.random() * 250;
    this.animate();
  }

  /**
  * Animates the coin by cycling through the coin images.
  *
  * - This function sets up an interval that runs every 350 milliseconds.
  * - It calls the `playAnimation` method, passing the array of coin images (`IMAGES_COINS`), to cycle through and display the animation.
  */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 350);
  }
}
