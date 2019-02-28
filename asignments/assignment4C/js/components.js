'use strict'

class cPos { //stores position
  constructor(x=0,y=0,z=0){
    this.pos = new Vector(x,y);
  }
}

class cCircleCollision{
  constructor(radius){
    this.radius = radius;
  }
}

class cPhysicsConstants { //stores physics constants
  constructor(){
    this.maxPolarVel = Math.PI/4//max/min polar velocity
    this.cartesianDrag = 0.98; //rate at which linear vel approaches 0
    this.polarDrag = .96; //rate at which rotational vel approaches 0
  }
}

class cPhysics {
  constructor(mass=null,xVel=0,yVel=0,angleVel=0){
    if (mass===null){
      console.log('mass not set, define by cCollision as PI r ^2');
    }
    this.mass = mass;
    this.invMass = 1/mass; //inverse mass
    // this.mass = Math.PI * entity.cCollision.radius * entity.cCollision.radius; //PI r^2

    this.vel = new Vector(xVel,yVel);
    this.angularVel = angularVel;
  }
}
