class Chicken extends MovableObject {
  width = 60;
  height = 50;
  y = 380;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  walking_sound = new Audio("audio/chicken_walk.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      this.walking_sound.play();
      this.walking_sound.volume = 0.2;
      if (this.x < 0) {
        this.walking_sound.pause();
      }
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
