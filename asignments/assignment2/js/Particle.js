"use strict";

class Particle {
  constructor(x = random(width), y = random(height), size = random(40,90), velX=0, velY=0){
    this.x = x;
    this.y = y;
    this.airResistance = 1.01;
    this.gravity = 0.2;
    this.fade = random(.95,.995);
    this.maxVel = 5;
    this.velocity = createVector(random(-this.maxVel,this.maxVel),random(-this.maxVel,this.maxVel));
    this.velocity.x = this.velocity.x + velX/5;
    this.velocity.y = this.velocity.y + velY/5;
    this.size = size;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = random(255);
    this.partType = random(3);
  }
  update(){
    if (this.a > 0){
      this.a = this.a*this.fade;
    }
    this.x += random(-1,1);
    this.y += random(-1,1);
    this.velocity.div(this.airResistance);
    this.size = this.size *this.fade;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.y += this.gravity;
    this.display();
  }

  display(){
    fill(this.r,this.g,this.b,this.a);
    stroke(255,255,255,this.a*20);
    strokeWeight(this.size/20);
    // stroke(0,0,0,0);

    if (this.partType < 1){
      ellipse(this.x,this.y,this.size);
    }
    if ((this.partType > 1) && ( this.partType < 2)) {
      rect(this.x,this.y,this.size,this.size);
    }
    if ((this.partType > 2) && ( this.partType < 3)) {
    const x1 = this.x+this.size;
    const x2 = this.x-this.size;
    const x3 = this.x;

    const y1 = this.y;
    const y2 = this.y+this.size;
    const y3 = this.y-this.size;
    triangle(x1,y1,x2,y2,x3,y3);
    }
  }


}
