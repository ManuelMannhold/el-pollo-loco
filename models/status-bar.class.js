class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 0;
    this.y = -5;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
 * Sets the health percentage and updates the object's image based on the current health level.
 * 
 * - The health percentage is stored in the `percentage` property.
 * - The object's image is updated by fetching the corresponding health image from `IMAGES_HEALTH`.
 * 
 * @param {number} percentage - The health percentage to be set (0 to 100).
 */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
 * Returns the index of the health image based on the current percentage.
 * 
 * - The image index ranges from 0 (lowest health) to 5 (full health).
 * 
 * @returns {number} The index of the health image corresponding to the current health percentage.
 */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
