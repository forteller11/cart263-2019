'use strict';

class Globals{
  constructor(){
    this.physics = new gPhysicsConstants();
    this.mouseEvents = new gMouseEvents();
    this.dragData = new gDragData();
  }
  update(){
    this.mouseEvents.update();
  }
}

class gPhysicsConstants { //stores physics constants
  constructor(){
    this.name = 'cPhysicsConstants';
    this.maxPolarVel = Math.PI/4//max/min polar velocity
    this.cartesianDrag = 0.98; //rate at which linear vel approaches 0
    this.polarDrag = .96; //rate at which rotational vel approaches 0
  }
}


  class gMouseEvents{ //tracks mouseEvents
    constructor(){
      this.mouseClick; //on initial click === true, then equals false
      this.mouseDown;
      this.mouseX;
      this.mouseY;
    }
  }

  class gDragData{
    constructor(){

    }
  }
