'use strict';
//The parent of a bunch of singleton components
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
    this.angularVelEffectOnLinear = 10; //how much angle vel effects resultant post collision linear vel
    this.rotationTransferOnCollision = .2;
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
      this.mouseX = 0;
      this.mouseY = 0;
      this.mouseHistX = [];
      this.mouseHistY = [];
      this.mouseHistMaxLength = 6;
      this.dragOffsetX = null;
      this.dragOffsetY = null;
      this.dragEntityRef = null;
    }
  }
