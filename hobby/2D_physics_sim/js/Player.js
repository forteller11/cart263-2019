"use strict";
/*
Player class contains an associated gamepad and a single physics object which
 it is responsible to adding force to based on any existing comopnent thrusters
 and the associated gamepad input
*/
class Player {
  constructor(gp = null, phyObject = null) {
    this.cursorX = width/2;
    this.cursorY = height/2;
    this.cursorSize = 24;
    this.cursorAngle = 0;
    this.cursorSpeedChange = 8;
    this.cursorAngleChange = .1;

    console.log("PLAYER w/gp" + gp.index + " spawned");
    this.gp = gp; //gamepad associated witht inputs for this ship obj
    this.phyObject = phyObject;
  }
  receiveInputs(){
    //then cycle through components, looking for thrusters
  }

    addForceToPhyObjectBasedOnInputs(){
      //cycle through to find all thrusters, see if they're pointed in same angle as thrusters (cos(theta) within 180)
    }
  update(){
    this.receiveInputs();

    if (gameMode === 0){ //if in build mode
      this.updateCursor();
      this.addComponentsBasedOnInputs();
    }

    if (gameMode === 1){ //if in play mode
      this.addForceToPhyObjectBasedOnInputs();
    }
    this.phyObject.update();
  }
  updateCursor(){
    // move cursor
    const axesThreshold = 0.2;
    if ((this.gp.axes[0] > axesThreshold) || (this.gp.axes[0] < -axesThreshold)) {
      this.cursorX += this.gp.axes[0] * this.cursorSpeedChange;
    }
    if ((this.gp.axes[1] > axesThreshold) || (this.gp.axes[1] < -axesThreshold)) {
      this.cursorY += this.gp.axes[1] * this.cursorSpeedChange;
    }

//create new phyObject just for displaying component on cursor object, splice it once player pressed A and create real component on perm physics obj
    if (this.gp.buttons[2].value){ //if "X" button pressed
    const newComponent = new Component(this.phyObject,this.cursorX ,this.cursorY,this.cursorAngle,random(20,80),1,null);
    this.phyObject.component.push(newComponent);
    this.phyObject.alterComponents();
    console.log("lol");
    }

    if (this.gp.buttons[3].value){ //if "X" button pressed
    const newComponent = new Thruster(this.phyObject,this.cursorX ,this.cursorY,this.cursorAngle,10,1,1);
    this.phyObject.component.push(newComponent);
    this.phyObject.alterComponents();
    console.log("thruster");
    }

    //draw cursor
    stroke(0);
    strokeWeight(3);
    fill(255,255,0);
    ellipse(this.cursorX,this.cursorY,this.cursorSize);

    // if (gamepadArr[i].buttons[2].pressed){
    //   console.log("I've been pressed!");
    // }
  }
  addComponentsBasedOnInputs(){

    // const component = new Component(this,this.cursorX,this.cursorY,this.cursorAngle,random(20,80),1,null);
  }
}
