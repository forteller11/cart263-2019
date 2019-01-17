"use strict";

class Particle {
  constructor(x = random(width),y = random(height),size= random(40,90)){
    this.x = x;
    this.y = y;
    const maxVel = 5;
    this.velocity = createVector(random(-maxVel,maxVel),random(-maxVel,maxVel));
    this.size = size;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.a = random(255);
  }
  update(){
    if (this.a > 0){
      this.a = this.a*.98;
    }
    this.x += random(-1,1);
    this.y += random(-1,1);
    this.velocity.div(airResistance);
    this.size = this.size *.98;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  display(){
    fill(this.r,this.g,this.b,this.a);
    stroke(255,255,255,this.a*20);
    stroke(0,0,0,0);
  }


}
