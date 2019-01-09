"use strict";
//handles collisions and physics
class Component{
  constructor(parent, x, y, angle = random(TWO_PI), radius, density, child = null){

  this.DistToParent = null; //dist (hypotonus) from parent
  this.angleToParent = null; //angle from itself to its parent (if the parent is at angle 0)

  this.parent = parent;
  this.x = x;
  this.y = y;
  this.angle = random(TWO_PI); //personal angle bout its center (wat direction is the component facing)
  this.radius = radius;
  this.density = density;
  this.child = []; //all childed componenets
  this.mass = this.radius*this.density;
  }
update(){
  this.calcPos();
  this.display();
}

calcPos(){
  // this.angle = 0 + this.parent.angle;
  //calc angle based on parent angle and offset
  //calc position based using trig, radius offsets relative to parent, and angle
  this.x = this.parent.centerOfMassX + (cos(this.parent.angle + this.angleToParent)*this.distToParent);
  this.y = this.parent.centerOfMassY + (sin(this.parent.angle + this.angleToParent)*this.distToParent);

}


display(){
  this.angleSelf
  stroke(255);
  fill(100);
  ellipse(this.x,this.y,this.radius*2);
  let xx = (cos(this.angle+this.parent.angle)*this.radius) + this.x;
  let yy = (sin(this.angle+this.parent.angle)*this.radius) + this.y;

  line(this.x,this.y,xx,yy);
  }

  delete(){

  }
}
