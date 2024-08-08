class ChickenSmall extends MovableObject {
    width = 60;
    height = 50;
    y = 380;

    IMAGES_WALKING_SMALL = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING_SMALL);

        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_SMALL);
        }, 200);
    }
}