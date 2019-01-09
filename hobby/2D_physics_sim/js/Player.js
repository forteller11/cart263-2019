"use strict";
/*
player class contains entities, moves those entities with input and physics calculations
*/
class Player {
  constructor(gp = null,x = random(width),y = random(height), angle = random(TWO_PI)){
    console.log("PLAYER w/gp"+gp.index+" spawned");
    this.gp = gp; //gamepad associated witht inputs for this ship obj
    this.child = [];
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.translationalVelocity = createVector(0,0);
    this.rotationalVelocity = createVector(0,0);

    this.randomiseSpawnConfig();
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
    let radiusOffset = 0;
    let angleOffset = 0;
    for (let i = 0; i < 8; i ++){
      let radius = random(20,60);
      let angle = random(TWO_PI);
      this.child[i] = new Component(this,radiusOffset,angleOffset,radius, 1, null);
      radiusOffset += random(-100,100);
      angleOffset += random(-1,1);
    }
    // this.child[i] = new Thruster(spawnX,spawnY,radius,angle,null,null,1);
  }

  display(){
    noFill();
    fill(255,255,0);
    ellipse(this.x,this.y,4);
    text("angle:"+round(this.angle*100)/100,this.x+200,this.y);
    text("GP:"+this.gp.index,this.x+200,this.y+40);
  }

  update(){
    this.angle += 0.01;
    this.x ++;
    this.display();
    for (let i = 0; i < this.child.length; i ++){
      this.child[i].update();
    }
  }
}
