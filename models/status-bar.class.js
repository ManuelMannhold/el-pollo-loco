class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];

    IMAGES_COINS = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ];

    IMAGES_BOTTLES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ]

    percentage = 100;
    coin = 0;
    bottle = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);

        this.loadImages(this.IMAGES_COINS);
        this.x = 40;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setCoin(0);

        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 80;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setBottle(0);
    }

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setCoin(coin) {
        this.coin = coin;
        let path = this.IMAGES_COINS[this.coinIndex()];
        this.img = this.imageCache[path];
    }

    setBottle(bottle) {
        this.bottle = bottle;
        let path = this.IMAGES_BOTTLES[this.bottleIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    coinIndex() {
        if (this.coin == 0) {
            return 0;
        } else if (this.coin == 1) {
            return 1;
        } else if (this.coin == 2) {
            return 2;
        } else if (this.coin == 3) {
            return 3;
        } else if (this.coin == 4) {
            return 4;
        } else if (this.coin == 5) {
            return 5;
        }
    }

    bottleIndex() {
        if (this.bottle == 0) {
            return 0;
        } else if (this.bottle == 1) {
            return 1;
        } else if (this.bottle == 2) {
            return 2;
        } else if (this.bottle == 3) {
            return 3;
        } else if (this.bottle == 4) {
            return 4;
        } else if (this.bottle == 5) {
            return 5;
        }
    }
}
