'use strict'

class cPos { //stores position
  constructor(angle=0,x=0,y=0,z=0){
    this.name = 'cPos';
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

class cHitbox{ //circle hitbox
  constructor(radius){
    this.name = 'cHitbox';
    this.radius = radius;
  }
}

class cPhysics {
  constructor(mass=null,xVel=0,yVel=0,angularVel=0){
    this.name = 'cPhysics';
    this.mass = mass;
    this.invMass = 1/mass; //inverse mass
    this.momentOfInertia = 0.0012; //how easily this object is rotated
    this.vel = new Vector(xVel,yVel);
    this.angularVel = angularVel;
    this.restitution = 0.8; //bouncyness or % force transferred in collisions, 1 = bouncy, 0=not
    if (mass===null){console.log('mass not set, define by cCollision as PI r ^2');}
  }
}

class cImage { //contains html image element
  constructor(imgUrl=null,sizeOfImage=null){
    this.name = 'cImage';
    this.image = document.createElement('IMG');
    this.image.src = imgUrl;
    this.image.style.position = 'fixed';
    this.image.width = sizeOfImage;
    this.image.height = sizeOfImage;
    body.appendChild(this.image);

    if (sizeOfImage === null){console.log('imgUrl === null');}
    if (sizeOfImage === null){console.log('size of image=== null, set to cHitbox.radius*2');}
  }
}

class cDraggable{
  constructor(){
    this.name = 'cDraggable';
    this.draggable = true
  }
}
