class Coins extends MovableObject {
  y = 100;
  coins = [];

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);

    this.x = 200 + Math.random() * 2000;
    this.y = 0 + Math.random() * 200;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 350);
  }
}