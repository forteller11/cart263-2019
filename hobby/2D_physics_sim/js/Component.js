"use strict";
//handles collisions and physics
class Component{
  constructor(parent, x, y, angle, radius, density, child = null){

  this.radiusOff; //dist (hypotonus) from parent
  this.angleOff; //angle offset relative to parent

  this.parent = parent;
  this.x = x;
  this.y = y;
  this.angle = angle;
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
  //calc angle based on parent angle and offset
  // this.angle = this.parent.angle + this.angleOff;
  //calc position based using trig, radius offsets relative to parent, and angle
  this.x = this.parent.centerOfMassX + (cos(this.parent.angle + this.angleOff)*this.radiusOff);
  this.y = this.parent.centerOfMassY + (sin(this.parent.angle + this.angleOff)*this.radiusOff);

}


display(){
  stroke(255);
  fill(100);
  ellipse(this.x,this.y,this.radius*2);
  let xx = (cos(this.angle)*this.radius) + this.x;
  let yy = (sin(this.angle)*this.radius) + this.y;

  line(this.x,this.y,xx,yy);
  }

  delete(){

  }
}
