class World {
  character = new Character();
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
  throwableObject = [];
  sound = false;
  bottle = false;
  bottles = 0;
  coins = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
  }

  setworld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 10);
    setInterval(() => {
      this.checkThrowObjects();
    }, 150);
  }

  checkCollisions() {
    this.forEachEnemy();
    this.forEachBottles();
    this.forEachCoins();
  }

  forEachCoins() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.coins++;
        this.statusBarCoins.setCoin(this.coins);
        this.level.coins.splice(index, 1);
      }
    });
  }

  forEachBottles() {
    this.level.bottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles) && this.bottles < 5) {
        this.bottles++;
        this.statusBarBottle.setBottle(this.bottles);
        this.bottle = true;
        this.level.bottles.splice(index, 1);
      }
    });
  }

  forEachEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
          enemy.isKilled = true;
        } else if (!enemy.isKilled) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

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
      }, 500);
      setInterval(() => {
        this.checkCollisionEnemyBottle(bottle);
      }, 10);
    }
  }

  checkCollisionEnemyBottle(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (bottle.isColliding(enemy)) {
        enemy.isKilled = true;
      }
    });
  }

  checkCollisionEndbossBottle(bottle, index) {
    if (this.level.endboss.isColliding(bottle)) {
      this.throwableObject.splice(index, 1);
      this.level.endboss.energy = this.endboss.energy - 20;
      this.statusBarBoss.setBoss(this.level.endboss.energy);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0); // Back
    // --------Space for fixed objects---------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0); // Forwards

    this.ctx.translate(-this.camera_x, 0);

    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
