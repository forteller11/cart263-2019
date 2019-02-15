//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";

class PhysicsComponent(entity,xInitial = 0,yInitial = 0){
  constructor(x,y,a){
    this.velocity = new Vector(xInitial,yInitial);
    this.x = x;
    this.y = y;
    this.a = a;
    this.components = [];
  }
  update(){
    for (let component of this.components){
      component.update();
    }
  }
}
