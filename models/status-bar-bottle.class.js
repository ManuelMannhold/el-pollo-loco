class StatusBarBottle extends DrawableObject {
  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  bottle = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 510;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.setBottle(0);
  }

  /**
 * Sets the bottle type and updates the object's image based on the current bottle index.
 * 
 * - The bottle type is stored in the `bottle` property.
 * - The object's image is updated by fetching the corresponding bottle image from `IMAGES_BOTTLES`.
 * 
 * @param {number} bottle - The bottle type or index (from 0 to 5) to be set.
 */
  setBottle(bottle) {
    this.bottle = bottle;
    let path = this.IMAGES_BOTTLES[this.bottleIndex()];
    this.img = this.imageCache[path];
  }

  /**
 * Returns the index of the current bottle based on its value.
 * 
 * - Returns a value between 0 and 5, based on the value of the `bottle` property.
 * - If the `bottle` value is greater than 5, it defaults to 5.
 * 
 * @returns {number} The index of the current bottle (0 to 5).
 */
  bottleIndex() {
    if (this.bottle == 0) {
      return 0;
    } else if (this.bottle == 1) {
      return 1;
    } else if (this.bottle == 2) {
      return 2;
    } else if (this.bottle == 3) {
      return 3;
    } else if (this.bottle == 4) {
      return 4;
    } else if (this.bottle == 5) {
      return 5;
    } else if (this.bottle > 5) {
      return 5;
    }
  }
}
