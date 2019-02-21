//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";

class Entity{
  constructor(imgUrl=null, x=ran(window.innerWidth), y=(window.innerHeight)/2, angle=0, radius=64, mass=1){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.mass = mass;
    this.velocity = new Vector(ran(-5,5),ran(-5,5));
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
    if (this.drag === false){
      this.velocity.mult(physicsDrag);
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
    this.positionImage();
  }

  positionImage(){
    this.image.style.left = (this.x - this.radius) + 'px';
    this.image.style.top = (this.y - this.radius) + 'px';
  }
}
