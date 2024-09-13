class ChickenSmall extends MovableObject {
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
  };

  IMAGES_WALKING_SMALL = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_SMALL);

    this.x = 200 + Math.random() * 3800;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
  * Animates the character or object by setting up two intervals for movement and death handling.
  *
  * - The first interval controls the movement of the character/object to the left, executing at 60 frames per second.
  * - The second interval handles the object's death animation or walking animation:
  *   - If the object is killed, it stops movement, sets the energy to false, updates the image to a 'dead' state, and removes the object from the world after 1 second.
  *   - If not killed, it continuously plays the walking animation.
  *
  * Note: The function checks whether the object is killed and handles the death and removal of the object accordingly.
  */
  animate() {
    setInterval(() => {
      if (!this.isKilled) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.energy && this.isKilled) {
        this.energy = false;
        this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
        setTimeout(() => {
          this.spliceChicken(this.getIndexChicken(this));
        }, 1000);
      } else if (!this.isKilled) this.playAnimation(this.IMAGES_WALKING_SMALL);
    }, 200);
  }

  /**
  * Removes a chicken enemy from the `level1.enemies` array at the specified index.
  * 
  * @param {number} i - The index of the chicken enemy to remove from the array.
  */
  spliceChicken(i) {
    level1.enemies.splice(i, 1);
  }


  /**
  * Retrieves the index of a chicken enemy from the `level1.enemies` array.
  * 
  * This method iterates through the `enemies` array in the `level1` object
  * and compares the x-coordinate of each chicken to the given object's x-coordinate.
  * 
  * @param {Object} obj - The object to find in the enemies array.
  * @param {number} obj.x - The x-coordinate of the object to match.
  * @returns {number|undefined} The index of the matching chicken enemy in the array, or undefined if no match is found.
  */
  getIndexChicken(obj) {
    for (let i = 0; i < level1.enemies.length; i++) {
      if (level1.enemies[i].x == obj.x) {
        return i;
      }
    }
  }
}
