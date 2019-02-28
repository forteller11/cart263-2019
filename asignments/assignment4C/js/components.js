'use strict'

class cPos { //stores position
  constructor(angle=0,x=0,y=0,z=0){
    this.pos = new Vector(x,y);
    this.angle = angle;
  }
}

class cHitbox{ //circle hitbox
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

class cImage { //contains html image element
  constructor(imgUrl=null,sizeOfImage=null){
    if (sizeOfImage === null){
      console.log('imgUrl === null');
    }
    if (sizeOfImage === null){
      console.log('size of image=== null, set to cHitbox.radius*2');
    }
    this.image = document.createElement('IMG');
    this.image.src = imgUrl;
    this.image.style.position = 'fixed';
    this.image.width = sizeOfImage;
    this.image.height = sizeOfImage;
    body.appendChild(this.image);
  }
}
