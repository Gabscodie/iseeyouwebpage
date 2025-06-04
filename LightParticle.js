/*
 * Define the light particles of each light effect  
 */ 
class LightParticle {
  constructor(x, y, col, animation) {
    // This is to know where the light stop and spread
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.animation = animation;
    
    // The effect differs in aging value, velocity
    // Spreading effect
    if (animation == "spreading") {
      //Only spread horizontally 
      this.vel.set(random(-2, 2), 0);
      this.size = random(4, 6);
      this.aging = 0.5;
      
      // Falling gravity effect
    } else if (animation == "hugging") {
      // As the magnitude is 1, the hugging effect is spred as a circle/ellipse shape
      this.vel.set(p5.Vector.random2D());
      this.size = random(4, 6);
      this.aging = 1;
      
      //Explosion effect
    } else if (animation == "connecting") { 
      this.vel.set(p5.Vector.random2D());
      this.size = random(10, 25);
      this.aging = 5;
    }
    
    this.col = col;
    this.age = 255;
  }
  
  // Only used for the hugging effect
  applyForce(force) {
    this.vel.add(force);
  }
  
  isFaded() {
    return this.age < 0;
  }
  
  // Only used for the hugging effect
  edges(edge) { 
    if (this.pos.y >= edge) {
      this.pos.y = edge;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width) {
      this.pos.x = width;
      this.vel.x *= -1;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
  }
  
  update() { 
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // Effect duration time
    this.age -= this.aging;
  }
  
  show() {
    noStroke();
    // Effect duration display
    this.col.setAlpha(this.age);
    fill(this.col);
    // Random in size to make it more magical
    ellipse(this.pos.x, this.pos.y, random(this.size), random(this.size));
  }
}
