"use strict";
//handles collisions and physics
class Component{
  constructor(parent, x, y, angle = random(TWO_PI), radius, density){

  this.DistToParent = null; //dist (hypotonus) from parent
  this.angleToParent = null; //angle from itself to its parent (if the parent is at angle 0)

  this.parent = parent;
  this.x = x;
  this.y = y;
  this.angle = angle; //personal angle bout its center (wat direction is the component facing)
  this.radius = radius;
  this.density = density;
  this.child = []; //all childed componenets
  this.dependent = []; //all components the object is connected to, if ever null then it is disconnected from phyObject, connected to phyObject itself
  this.mass = this.radius*this.density;

  this.hp = 100;
  }
update(){
  this.calcPos();
  this.display();
}

calcPos(){
  //calc angle based on parent angle and offset
  //calc position based using trig, radius offsets relative to parent, and angle
  this.x = this.parent.centerOfMassX + (cos(this.parent.angle + this.angleToParent)*this.distToParent);
  this.y = this.parent.centerOfMassY + (sin(this.parent.angle + this.angleToParent)*this.distToParent);

}


display(){
  stroke(255);
  fill(100);
  strokeWeight(2);
  ellipse(this.x,this.y,this.radius*2);
  let xx = (cos(this.angle+this.parent.angle)*this.radius) + this.x;
  let yy = (sin(this.angle+this.parent.angle)*this.radius) + this.y;

  line(this.x,this.y,xx,yy);
  }

}
