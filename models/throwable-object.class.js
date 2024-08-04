class ThrowableObject extends MovableObject{
    speedY = 30;
    speedX = 20;
    world;

    constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;
    this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravitiy();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}