/*
 * Define the stars in the galaxy 
 * Each star travels in an elliptical path which set its position in the galaxy
 */
class Star {
  constructor(path) {
    // Their position is relating to its how wide and tall its elliptical path is
    this.theta = random(360);
    this.size = random(2, 3);
    this.path = path;
    // Divided by path width and height by 2 to calculate the x and y position of each star in its elliptical path 
    this.x = this.path.wide / 2 * cos(this.theta);
    this.y = this.path.tall / 2 * sin(this.theta);
    // The star needs to blink and here is the frequency for its blinking duration
    this.blinkingFreq = random(1.5, 3);
  }

  update() {
    this.theta += 0.1;
    this.x = this.path.wide / 2 * cos(this.theta);
    this.y = this.path.tall / 2 * sin(this.theta);
  }

  // The colour and size of each stars keeps changing to create magical effect
  show() {
    fill(random(180), 100, sin(frameCount) * 255);
    noStroke();
    circle(this.x, this.y, sin(frameCount * this.blinkingFreq) * this.size);
  }
}
