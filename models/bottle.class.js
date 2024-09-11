class Bottle extends MovableObject {
  y = 360;
  bottles = [];
  width = 60;
  height = 80;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 3600;
    this.animate();
  }

  /**
 * Animates the object by cycling through a set of images.
 * 
 * This method runs the animation by periodically calling `playAnimation()`
 * with the `IMAGES_BOTTLE` array. The animation runs every 500 milliseconds.
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 500);
  }

  /**
 * Retrieves the index of a bottle object from the `level1.bottles` array.
 * 
 * This method iterates through the `bottles` array in the `level1` object
 * and compares the x-coordinate of each bottle to the given object's x-coordinate.
 * 
 * @param {Object} obj - The object to find in the bottles array.
 * @param {number} obj.x - The x-coordinate of the object to match.
 * @returns {number|undefined} The index of the matching bottle in the array, or undefined if no match is found.
 */
  getIndexBottles(obj) {
    for (let i = 0; i < level1.bottles.length; i++) {
      if (level1.bottles[i].x == obj.x) {
        return i;
      }
    }
  }
}
