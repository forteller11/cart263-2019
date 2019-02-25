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
    const maxAngleVel = Math.PI/4;
    this.angleVelocity = constrain(this.angleVelocity,-maxAngleVel,maxAngleVel);
    this.angle += this.angleVelocity;
  super.update();
  }
}
