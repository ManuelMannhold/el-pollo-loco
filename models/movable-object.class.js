class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
  * Applies gravity to an object by adjusting its vertical position (`y`) and speed (`speedY`) over time.
  *
  * - This function is executed at a rate of 25 frames per second (40ms interval).
  * - If the object is above the ground or moving upwards (`speedY > 0`), the function will:
  *   1. Decrease the `y` position by the current `speedY`, causing the object to move upwards.
  *   2. Gradually decrease `speedY` by the object's `acceleration` to simulate the effect of gravity, causing it to slow down as it ascends and eventually fall back down.
  */
  applyGravitiy() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
 * Determines whether the object is above the ground.
 * 
 * - For `ThrowableObject` instances, it always returns true to ensure they fall.
 * - For other objects, it checks if the y-coordinate is less than 210.
 * 
 * @returns {boolean} True if the object is above the ground, false otherwise.
 */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  /**
 * Checks if the object is colliding with another object.
 * 
 * This method compares the position and size (including offsets) of two objects to detect collisions.
 * 
 * @param {Object} obj - The object to check collision with.
 * @param {number} obj.x - The x-coordinate of the other object.
 * @param {number} obj.y - The y-coordinate of the other object.
 * @param {number} obj.width - The width of the other object.
 * @param {number} obj.height - The height of the other object.
 * @param {Object} obj.offset - The offset of the other object to fine-tune collision detection.
 * @returns {boolean} True if the objects are colliding, false otherwise.
 */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
 * Reduces the object's energy by 5 when hit.
 * 
 * - Ensures the energy doesn't drop below 0.
 * - Records the time of the last hit for tracking purposes.
 */
  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
 * Checks if the object is hurt by determining if it was hit within the last second.
 * 
 * @returns {boolean} True if the object was hurt in the last second, false otherwise.
 */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  /**
 * Determines if the object is dead based on its energy level.
 * 
 * @returns {boolean} True if the object's energy is 0 or below, false otherwise.
 */
  isDead() {
    return this.energy <= 0;
  }

  /**
 * Moves the object to the right by increasing its x-coordinate by its speed.
 */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = true;
  }

  /**
 * Moves the object to the left by decreasing its x-coordinate by its speed.
 */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;
  }

  /**
 * Makes the object jump by setting its vertical speed if it is not already above the ground.
 * Plays a jump sound effect when jumping.
 */
  jump() {
    if (!this.isAboveGround()) {
      this.world.audios.jump_sound_character.play();
      this.speedY = 30;
    }
  }

  /**
 * Plays an animation by cycling through an array of image paths.
 * 
 * - The animation loops through the provided images array.
 * - Updates the current image of the object based on the animation index.
 * 
 * @param {string[]} images - An array of image paths for the animation.
 */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
