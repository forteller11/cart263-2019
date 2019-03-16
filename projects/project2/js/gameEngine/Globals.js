'use strict';
//The parent of a bunch of singleton components
class Globals{
  constructor(){
    this.physics = new gPhysicsConstants();
    this.mouse = new gMouseEvents();
    this.drag = new gDragData();
    this.spawn = new gSpawnRate();
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
    this.polarDrag = .3; //rate at which rotational vel approaches 0
    this.angularVelEffectOnLinear = 10; //how much angle vel effects resultant post collision linear vel
    this.rotationTransferOnCollision = .2;
    this.windX = 0;
    this.windY = .1;
  }
}


  class gMouseEvents{ //tracks mouseEvents
    constructor(){
      this.click = false; //on initial click === true, then equals false
      this.down = false;
      this.x = null;
      this.x = null;
      this.histX = [];
      this.histY = [];
      this.histMaxLength = 6;
    }
  }

  class gDragData{
    constructor(){
      this.dragOffsetX = null;
      this.dragOffsetY = null;
      this.dragEntityRef = null;
    }
  }

  class gSpawnRate{
    constructor(){
      this.rate = 1/(60*50) //avg every 5 s;
    }
  }
