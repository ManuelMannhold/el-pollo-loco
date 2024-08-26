class StatusbarEndboss extends DrawableObject {
    energy = 100;
    IMAGES_ENDBOSS = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 510;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setBoss(100);
    }

    setBoss(energy) {
        this.energy = energy;
        let path = this.IMAGES_ENDBOSS[this.endbossIndex()];
        this.img = this.imageCache[path];
    }

    endbossIndex() {
        if (this.energy >= 100) {
            return 5;
        } else if (this.energy > 80) {
            return 4;
        } else if (this.energy > 60) {
            return 3;
        } else if (this.energy > 40) {
            return 2;
        } else if (this.energy > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}