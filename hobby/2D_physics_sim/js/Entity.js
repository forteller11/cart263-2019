"use strict";
//handles collisions and physics
class Entity{
  constructor(x = width/2,y = height/2,r = 50,a = 0,density = 1, parent = null, child = null){
  this.x = x;
  this.y = y;
  this.radius = r;
  this.angle = a; //angle
  this.density = density;
  this.mass = this.radius*this.density;

  this.xOff; //offset from ship's x/y/angle
  this.yOff;
  this.angleOff;
  }
update(){
  this.display();
  console.log("updateentity");
}
display(){
  stroke(255);
  fill(100);
  ellipse(this.x,this.y,this.radius*2);
  let xx = (cos(this.angle)*this.radius) + this.x;
  let yy = (sin(this.angle)*this.radius) + this.y;

  line(this.x,this.y,xx,yy);
  }
}
