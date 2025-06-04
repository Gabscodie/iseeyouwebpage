/* 
 * The galaxy is drawn by rotating 800 ellipses in a constant rotating scale to create the spiral effect.
 * This rotating scale differs after every frame when the mouse move around Canvas.
 * Each elliptical path has 3 - 8 stars travelling on
 */
class StarPath {
  constructor(w, t, rot) {
    // wide and tall of each elliptical path
    this.wide = w;
    this.tall = t;

    // Rotating angle of each path
    this.rotAngle = rot;

    // The star system of each path
    this.myStars = [];
    for (let i = 0; i < int(random(3, 8)); i++) {
      this.myStars.push(new Star(this));
    }
  }

  show() {
    push();
    //Add up after every frame with push() and pop()
    rotate(this.rotAngle);
    // Blurring path displayed
    stroke(182, 211, 182, 5);
    noFill();
    ellipse(0, 0, this.wide, this.tall);
    for (let i = 0; i < this.myStars.length; i++) {
      this.myStars[i].show();
    }
    pop();

  }

  update() {
    // Update star positions in the star system
    this.rotAngle += random(rotOffset);
    for (let i = 0; i < this.myStars.length; i++) {
      this.myStars[i].update();
    }
  }
}


