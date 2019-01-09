class PhysicsObject{
  constructor(angle = 0){
  this.component = [];
  this.angle = angle;
  this.centerOfMassX = width/2;
  this.centerOfMassY = height/2;
  this.totalMass;

  this.translationalVelocity = createVector(1,0);
  this.rotationalVelocity = createVector(.01);
  }

  calculateCenterOfMass(){ //uses components positions and masses to calcualte center of mass
    this.totalMass = 0;
    let numeratorX = 0;
    let numeratorY = 0;
    for (let i = 0; i < this.component.length; i ++){
      this.totalMass += this.component[i].mass; //will be used later to sort of normalize the equation (not precise explanation)
      //calc polar offsets, then use parent.angle to find new x,y off on new ship

      numeratorX += this.component[i].x*this.component[i].mass; //in this way objects w/more mass will contribute more to CofM calculation
      numeratorY += this.component[i].y*this.component[i].mass;
    }
    this.centerOfMassX = numeratorX/this.totalMass;
    this.centerOfMassY = numeratorY/this.totalMass;
  }

  calculateComponentOffsets(){
    for (let i = 0; i < this.component.length; i ++){ //cartesian to polar conversion
      let deltaX = this.component[i].x - this.centerOfMassX;
      let deltaY = this.component[i].y - this.centerOfMassY;

      let componentXRelative;
      let componentYRelative;
      if (!(this.angle === 0)){ //if parent angle isn't 0 recalculates cartesian position of component so it doesn't calc angle/dist to parent as if parent had a 0 angle
      const distToParent = sqrt(sq(deltaX)+sq(deltaY));
      const angleToParent = atan2(deltaY,deltaX);

      componentXRelative = cos(angleToParent-this.angle)*distToParent;
      componentYRelative = sin(angleToParent-this.angle)*distToParent;
    } else{
      componentXRelative = deltaX;
      componentYRelative = deltaY;
    }
      this.component[i].distToParent = sqrt(sq(componentXRelative)+sq(componentYRelative));
      this.component[i].angleToParent = atan2(componentYRelative,componentXRelative);

      console.log("deltaX"+deltaX);
      console.log("distToParent"+this.component[i].distToParent);
      console.log("angleToParent"+this.component[i].angleToParent);
    }
  }

  alterComponents() {

    this.calculateCenterOfMass();
    this.calculateComponentOffsets();

  }
  addForce(originX,originY,direction,magnitude){
    //determine how much translationalVel to change
    //depending on how far from centerOfMass and moment of inertia, calc how much rotational vel change
    //all calculate moment of inert
  }
  updatePosBasedOnVelocity(){
    this.centerOfMassX += this.translationalVelocity.x;
    this.centerOfMassY += this.translationalVelocity.y;

    this.angle += this.rotationalVelocity.x;
  }
  update(){
    //this.changePosBasedOnForce();
    fill(255,255,0);
    ellipse(this.centerOfMassX,this.centerOfMassY,20);
    for (let i = 0; i < this.component.length; i ++){ //cartesian to polar conversion
      this.component[i].update();
    }
    this.updatePosBasedOnVelocity();
  }
}
