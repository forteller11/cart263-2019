'use strict';

class Food extends Entity{
  consutrctor(imgUrl, x, y, angle, radius, mass){
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
