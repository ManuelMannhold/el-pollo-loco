class StatusBarCoins extends DrawableObject {
  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  coin = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINS);
    this.x = 0;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setCoin(0);
  }

  /**
 * Sets the coin type and updates the object's image based on the current coin index.
 * 
 * - The coin type is stored in the `coin` property.
 * - The object's image is updated by fetching the corresponding coin image from `IMAGES_COINS`.
 * 
 * @param {number} coin - The coin type or index (from 0 to 5) to be set.
 */
  setCoin(coin) {
    this.coin = coin;
    let path = this.IMAGES_COINS[this.coinIndex()];
    this.img = this.imageCache[path];
  }

  /**
 * Returns the index of the current coin based on its value.
 * 
 * - Returns a value between 0 and 5, based on the value of the `coin` property.
 * - If the `coin` value is greater than 5, it defaults to 5.
 * 
 * @returns {number} The index of the current coin (0 to 5).
 */
  coinIndex() {
    if (this.coin == 0) {
      return 0;
    } else if (this.coin == 1) {
      return 1;
    } else if (this.coin == 2) {
      return 2;
    } else if (this.coin == 3) {
      return 3;
    } else if (this.coin == 4) {
      return 4;
    } else if (this.coin == 5) {
      return 5;
    } else if (this.coin > 5) {
      return 5;
    }
  }
}
