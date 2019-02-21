'use strict';

class Food extends Entity{
  consutrctor(imgUrl=null, x=ran(window.innerWidth), y=ran(0,window.innerHeight), angle=0, radius=ran(16,128), mass=1){
    this.super(imgUrl, x, y, angle, radius, mass);
  }

  update(){
    if (this.drag === false){
      this.velocity.mult(physicsDrag);
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  this.positionImage();
  // console.log(this.velocity.x);
  }
}
