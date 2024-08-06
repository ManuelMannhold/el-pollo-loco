class Coins extends World {
   world;
   y = 100;
   
    IMAGES_COINS = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ];

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);

        this.x = 200 + Math.random() * 2000;
        this.y = 50 + Math.random() * 100;
    }

    animate() {
        
    }
}   