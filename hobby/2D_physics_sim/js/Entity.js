"use strict";
//handles collisions and physics
class Entity{
  constructor(x,y,r,density){
  this.x = x;
  this.y = y;
  this.r = r;
  this.density = density;
  this.mass = this.r*this.density;
  }

display(){
  stroke(255);
  fill(100);
  ellipse(this.x,this.y,this.r);
  }
}
