"use strict";
class Player{
  constructor(gp = null,x = random(width),y = random(height), angle = random(TWO_PI)){
    console.log("HEYY IM NEW SHIP");
    this.gp = gamepadInterface; //gamepad associated witht inputs for this ship obj
    this.child = [];
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.translationalVelocity = createVector(0,0);
    this.rotationalVelocity = createVector(0,0);
  }
  addForce(){ //cycle through all children, find thrusters, see if their forces should be added to direct of input
    for (let i = 0; i < this.child.length; i ++){
      if (this.child[i] instanceof Thruster){ //is child a thruster
        //see if and how much force shud be added
      }
    }
  }

  updateChildren(){
    for (let i = 0; i < this.child.length; i ++){
      this.child[i].x = this.x + this.child[i].xOff;
      this.child[i].y = this.y+ this.child[i].yOff;
      this.child[i].angle = this.angle + this.child[i].angleOff;
    }
  }

  randomiseSpawnConfig(){ //generates random starting child-parent enttities

  }

  display(){
    ellipse(this.x,this.y,20);
  }

  update(){
    this.display();
    console.log("e");
  }
}
