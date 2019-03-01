'use strict';

class Globals{
  constructor(){
    this.physics = new gPhysicsConstants();
    this.mouseEvents = new gMouseEvents();
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

    }
  }
