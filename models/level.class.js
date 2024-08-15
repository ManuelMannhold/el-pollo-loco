class Level {
  coins;
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  level_end_x = 2200;

  constructor(backgroundObjects, clouds, coins, enemies, bottles) {
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.coins = coins;
    this.enemies = enemies;
    this.bottles = bottles;
  }
}
