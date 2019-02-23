//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";

class Entity{
  constructor(imgUrl=null, x=ran(window.innerWidth), y=ran(0,window.innerHeight), angle=ran(Math.PI*2), radius=ran(16,128), mass=1){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;

    this.mass = radius/64;
    this.velocity = new Vector(ran(-5,5),ran(-5,5));
    this.angleVelocity = ran(-.1,.1);
    this.invMass = 1/this.mass; //inversemass
    this.drag = false;

    this.image = document.createElement('IMG');
    this.image.src = imgUrl;
    this.image.style.position = 'fixed';
    this.image.width = radius*2;
    this.image.height = radius*2;
    this.positionImage();
    body.appendChild(this.image);
  }

  update(){
    this.angleVelocity *= physicsDrag;
    this.positionImage();
  }

  positionImage(){
    // transform: rotate(90deg);
    const angleDegrees = this.angle*180;
    this.image.style.transform = 'rotate('+angleDegrees+'deg)';
    this.image.style.left = (this.x - this.radius) + 'px';
    this.image.style.top = (this.y - this.radius) + 'px';
  }
}
