class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 20;
  width = 100;
  height = 150;

  /**
  * Loads an image and sets it as the current image for the object.
  *
  * - This method creates a new `Image` object and sets its `src` attribute to the provided file path.
  * - The loaded image is stored in the `img` property of the object.
  *
  * @param {string} path - The file path of the image to load.
  */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
 * Draws the object on the provided canvas context using its image, position, and size.
 * 
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the image on.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ....]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
