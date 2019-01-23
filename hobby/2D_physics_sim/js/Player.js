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
    this.phyObjectAngleChange = .06;

    console.log("PLAYER w/gp" + gp.index + " spawned");
    this.gp = gp; //gamepad associated witht inputs for this ship obj
    this.phyObject = phyObject;
  }
  receiveInputs(){
    //then cycle through components, looking for thrusters
  }

    addForceToPhyObjectBasedOnInputs(){
      //rotate using right/left bumper
      if (this.gp.buttons[5].value || this.gp.buttons[7].value){
        this.phyObject.rotationalVelocity.x += this.phyObjectAngleChange/this.phyObject.momentOfInertia;
      }
      if (this.gp.buttons[4].value || this.gp.buttons[6].value){
        this.phyObject.rotationalVelocity.x -= this.phyObjectAngleChange/this.phyObject.momentOfInertia;
      }

      const axesThreshold = 0.2;
      //calculate contributing force of thrusters on movement of physics object given inputs
      if ((this.gp.axes[0] > axesThreshold) || (this.gp.axes[0] < -axesThreshold) || (this.gp.axes[1] > axesThreshold) || (this.gp.axes[1] < -axesThreshold)) {
        for (let i = 0; i < this.phyObject.component.length; i ++){
          if (this.phyObject.component[i] instanceof Thruster){
            const angleOfAxis = atan2(this.gp.axes[1],this.gp.axes[0]);
            const thruster = this.phyObject.component[i];
            //90 angle or more delta between angles would lead to 0-(-1) influence
            let thrusterInfluence = cos(thruster.angle+this.phyObject.angle - angleOfAxis); //now 90angle or more delta wud lead to 0 influence
            thrusterInfluence = constrain(thrusterInfluence,-1,0);
            const thrustForce = thruster.thrustForce * thrusterInfluence;
            this.phyObject.addTranslationalForce(thruster.angle+this.phyObject.angle, thrustForce);
            // this.phyObject += this.gp.axes[0] * this.cursorSpeedChange;
          }
        }
      }
      // if ((this.gp.axes[1] > axesThreshold) || (this.gp.axes[1] < -axesThreshold)) {

        // this.cursorY += this.gp.axes[1] * this.cursorSpeedChange; //
      // }
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
      this.cursorY += this.gp.axes[1] * this.cursorSpeedChange; //
    }
    //rotate using right/left bumper
    if (this.gp.buttons[5].value || this.gp.buttons[7].value){
      this.cursorAngle += this.cursorAngleChange;
    }
    if (this.gp.buttons[4].value || this.gp.buttons[6].value){
      this.cursorAngle -= this.cursorAngleChange;
    }

    // for (let i = 0; i < this.gp.buttons.length; i ++){ //what buttons are being pressed?
    //   if (this.gp.buttons[i].value){
    //     console.log("buttonIndex:"+ i);
    //   }
    // }

//create new phyObject just for displaying component on cursor object, splice it once player pressed A and create real component on perm physics obj
    if (this.gp.buttons[2].value){ //if "X" button pressed
    const newComponent = new Component(this.phyObject,this.cursorX ,this.cursorY,this.cursorAngle-this.phyObject.angle,random(20,80),1);
    this.phyObject.component.push(newComponent);
    this.phyObject.alterComponents();
    console.log("component");
    }

    if (this.gp.buttons[3].value){ //if "X" button pressed
    const newComponent = new Thruster(this.phyObject,this.cursorX ,this.cursorY,this.cursorAngle-this.phyObject.angle,random(10,20),1);
    this.phyObject.component.push(newComponent);
    this.phyObject.alterComponents();
    console.log("thruster");
    }

    //draw cursor
    stroke(0);
    strokeWeight(3);
    fill(255,255,0);
    const x2 = cos(this.cursorAngle)*this.cursorSize;
    const y2 = sin(this.cursorAngle)*this.cursorSize;
    ellipse(this.cursorX,this.cursorY,this.cursorSize*2);
    line(this.cursorX,this.cursorY,x2+this.cursorX,y2+this.cursorY);

    // if (gamepadArr[i].buttons[2].pressed){
    //   console.log("I've been pressed!");
    // }
  }
  addComponentsBasedOnInputs(){

    // const component = new Component(this,this.cursorX,this.cursorY,this.cursorAngle,random(20,80),1,null);
  }
}
