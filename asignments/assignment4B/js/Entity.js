//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";

class Entity(x,y,a){
  constructor(x,y,a){
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
