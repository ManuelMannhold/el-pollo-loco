class Chicken extends MovableObject {
  width = 60;
  height = 50;
  y = 380;
  energy = true;
  isKilled = false;
  walking_sound_chicken = new Audio("audio/chicken_walk.mp3");
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING_BIG = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_BIG);
    this.x = 200 + Math.random() * 3800;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
  * Animates the character or object by setting up two intervals for movement and handling death animation.
  *
  * - The first interval controls the leftward movement of the object, updating at 60 frames per second.
  * - The second interval handles the death logic:
  *   - If the object has energy but is marked as killed, it transitions to the death state by setting `energy` to false, marking it as killed, and loading the 'dead' image. 
  *   - After a delay of 1 second, the object is removed from the world.
  *   - If the object is not killed, it continuously plays the walking animation.
  */
  animate() {
    setInterval(() => {
      if (!this.isKilled) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.energy && this.isKilled) {
        this.energy = false;
        this.isKilled = true;
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        setTimeout(() => {
          this.spliceChicken(this.getIndexChicken(this));
        }, 1000);
      } else if (!this.isKilled) this.playAnimation(this.IMAGES_WALKING_BIG);
    }, 200);
  }

  /**
 * Removes an enemy (chicken) from the `level1.enemies` array at the specified index.
 * 
 * @param {number} i - The index of the enemy (chicken) to remove from the array.
 */
  spliceChicken(i) {
    level1.enemies.splice(i, 1);
  }

  /**
 * Finds the index of a specific enemy (chicken) in the `level1.enemies` array.
 * 
 * This method iterates through the `enemies` array in the `level1` object
 * and returns the index of the enemy whose x-coordinate matches the given object's x-coordinate.
 * 
 * @param {Object} obj - The object to find in the enemies array.
 * @param {number} obj.x - The x-coordinate of the object to match.
 * @returns {number|undefined} The index of the matching enemy (chicken), or undefined if no match is found.
 */
  getIndexChicken(obj) {
    for (let i = 0; i < level1.enemies.length; i++) {
      if (level1.enemies[i].x == obj.x) {
        return i;
      }
    }
  }
}
