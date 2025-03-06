class World {
  character = new Character(this);
  chicken = new Chicken(this);
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  backgroundImageWorld;
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoins = new StatusBarCoins();
  statusBarBoss = new StatusbarEndboss();
  endboss = new Endboss();
  throwableObject = [];
  sound = false;
  bottle = false;
  bottles = 0;
  coins = 0;
  bottleOnGround = false;
  splashedBottle = false;
  audios;

  constructor(canvas, keyboard, audioCollection) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.audios = audioCollection;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
  }

  /**
   * Sets the current world context to the character.
   *
   * - This allows the character to interact with the world, such as checking collisions.
   */
  setworld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop by setting intervals for collision checking and throwing objects.
   *
   * - Calls `checkCollisions` every 50 milliseconds to handle interactions between objects.
   * - Calls `checkThrowObjects` every 150 milliseconds to handle object throwing and collision detection.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 20);
    setInterval(() => {
      this.checkThrowObjects();
    }, 150);
    setInterval(() => {
      this.bottlesForEndboss();
    }, 150);
  }

  /**
   * Checks for collisions between the character and various objects (enemies, bottles, coins, and endboss).
   *
   * - Calls specific methods for each type of object to handle collision logic.
   */
  checkCollisions() {
    this.forEachEnemy();
    this.forEachBottles();
    this.forEachCoins();
    this.forEndboss();
  }

  /**
   * Checks for collisions between the character and coins.
   *
   * - If a collision is detected, the coin is collected, and the coin count is updated.
   */
  forEachCoins() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.coins++;
        this.audios.coins_pick_sound.play();
        this.statusBarCoins.setCoin(this.coins);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   *
   * - If a collision is detected and the bottle count is less than 5, the bottle is collected.
   */
  forEachBottles() {
    this.level.bottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles) && this.bottles < 5) {
        this.audios.pick_bottle.play();
        this.bottles++;
        this.statusBarBottle.setBottle(this.bottles);
        this.bottle = true;
        this.level.bottles.splice(index, 1);
        this.aviableBottles();
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies.
   *
   * - If the character collides with an enemy and is falling from above, the enemy is marked as killed.
   * - If the character collides with an enemy while not falling, the character is hurt.
   */
  forEachEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
          enemy.isKilled = true;
          this.audios.chicken_dead.play();
        } else if (!enemy.isKilled) {
          this.audios.hurt_sound.play();
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and the endboss.
   *
   * - If a collision is detected, the character is hurt and the status bar is updated.
   */
  forEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.audios.hurt_sound.play();
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks if the player has pressed the throw button and if there are bottles available to throw.
   *
   * - Creates a new throwable bottle and adds it to the list of throwable objects.
   * - Sets intervals to check for collisions between the bottle and enemies or the endboss.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.bottles--;
      this.statusBarBottle.setBottle(this.bottles);
      setInterval(() => {
        this.checkCollisionEndbossBottle(bottle);
      }, 600);
      setInterval(() => {
        this.checkCollisionEnemyBottle(bottle);
      }, 10);
    }
  }

  /**
   * Checks the status of the Endboss's energy and the number of bottles remaining in the level.
   *
   * - If the Endboss still has energy (`endboss.energy > 0`) and there are fewer than 5 bottles left in the level (`level.bottles < 5`), the game will trigger the `endGame()` function, indicating that the player has run out of resources to defeat the Endboss.
   */
  bottlesForEndboss() {
    if (this.endboss.energy > 0 && this.level.bottles < 5) {
      endGame();
    }
  }

  /**
   * Checks for collisions between a thrown bottle and enemies.
   *
   * - If the bottle collides with an enemy, the enemy is killed and removed from the list of throwable objects.
   *
   * @param {ThrowableObject} bottle - The bottle to check for collisions.
   */
  checkCollisionEnemyBottle(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (bottle.isColliding(enemy)) {
        this.audios.chicken_dead.play();
        enemy.isKilled = true;
        this.throwableObject.splice(-1, 1);
      }
    });
  }

  /**
   * Checks for collisions between a thrown bottle and the endboss.
   *
   * - If the bottle collides with the endboss, the endboss's energy is reduced, and the splash effect is triggered.
   *
   * @param {ThrowableObject} bottle - The bottle to check for collisions.
   */
  checkCollisionEndbossBottle(bottle) {
    if (this.endboss.isColliding(bottle)) {
      this.throwableObject.splice(-1, 1);
      this.endboss.energy = this.endboss.energy - 20;
      this.endboss.bottleHurt = true;
      this.endboss.checkBottleHurt();
      this.statusBarBoss.setBoss(this.endboss.energy);
    }
  }

  /**
   * Clears the canvas and redraws all objects, including the character, level elements, and status bars.
   *
   * - Calls `objectsAddToMap` to draw all level objects and `statusbarsAddToMap` to draw status bars.
   * - Uses `requestAnimationFrame` for continuous redrawing.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.objectsAddToMap();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.statusbarsAddToMap();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds status bars to the map.
   *
   * - Adds the status bar elements to the map, including the character's status bars and any additional status indicators.
   */
  statusbarsAddToMap() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds level objects to the map.
   *
   * - Draws background objects, clouds, enemies, the endboss, throwable objects, coins, and bottles.
   *
   * @param {Array|Object} objects - An array of objects or a single object to be added to the map.
   */
  objectsAddToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  /**
   * Updates the HTML element displaying the number of available bottles in the level.
   *
   * - The function selects the DOM element with the ID `aviable-bottles` and updates its content to show the current number of bottles available in the game level.
   * - It uses the `level.bottles.length` to dynamically display the number of bottles remaining.
   */
  aviableBottles() {
    let aviableBottles = document.getElementById("aviable-bottles");

    aviableBottles.innerHTML = `
      <div>
      Aviable Bottles =
        ${this.level.bottles.length}
       </div> 
    `;
  }

  /**
   * Adds multiple objects to the map.
   *
   * - If the input is an array, iterates through the array and adds each object to the map.
   * - If the input is a single object, adds it to the map directly.
   *
   * @param {Array|Object} objects - An array of objects or a single object to be added to the map.
   */
  addObjectsToMap(objects) {
    if (Array.isArray(objects)) {
      objects.forEach((o) => {
        this.addToMap(o);
      });
    } else {
      this.addToMap(objects);
    }
  }

  /**
   * Adds an individual object to the map and handles image flipping if needed.
   *
   * - Draws the object on the canvas and flips the image if the object is facing the other direction.
   *
   * @param {Object} mo - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally for objects facing the other direction.
   *
   * - Translates and scales the canvas context to flip the image.
   *
   * @param {Object} mo - The object whose image needs to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context after flipping the image.
   *
   * - Reverts the canvas context to its original state after flipping.
   *
   * @param {Object} mo - The object whose image was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
