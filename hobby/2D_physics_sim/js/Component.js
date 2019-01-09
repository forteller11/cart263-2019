"use strict";
//handles collisions and physics
class Component{
  constructor(parent, radiusOff, angleOff, radius = 50, density = 1, child = null){
  this.parent = parent;
  this.radiusOff = radiusOff; //dist (hypotonus) from parent
  this.angleOff = angleOff; //angle offset relative to parent
  this.radius = radius;
  this.density = density;
  this.mass = this.radius*this.density;
  this.child = []; //all childed componenets

  this.x;
  this.y;
  this.angle;

  }
update(){
  this.calcPos();
  this.display();
}

calcPos(){
  //calc angle based on parent angle and offset
  this.angle = this.parent.angle + this.angleOff;
  //calc position based using trig, radius offsets relative to parent, and angle
  this.x = this.parent.x + (cos(this.angle)*this.radiusOff);
  this.y = this.parent.y + (sin(this.angle)*this.radiusOff);
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
