/*
 * This class defines the particles of each chakra system 
 * They combine to create the emission effect
 */ 
class ChakraParticle {
  constructor(x, y, col) {

    // The position of the effect
    this.pos = createVector(x, y);
    this.size = 5;
    this.col = col;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(random(-1, 1), random(-1, 1));
    this.acc.mult(0.05);

    // The lifetime of the effect
    this.age = 255;
  }
  
  /*
   * This class announces if the light of each chakra particle is faded
   */ 
  isFaded() {
    return this.age < 0;
  }
  
  /*
   * Update particle position
   */ 
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.age -= 20;
  }
  
  /*
   * Display particle light and set the alpha to match its age
   */
  show() {
    noStroke();
    this.col.setAlpha(this.age);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  
}
