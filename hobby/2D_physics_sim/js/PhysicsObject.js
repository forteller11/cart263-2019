"use strict";
class PhysicsObject {
  constructor(centerOfMassX = width/2, centerOfMassY = height/2, angle = 0) {
    this.component = [];
    this.angle = angle;
    this.centerOfMassX = centerOfMassX ;
    this.centerOfMassY = centerOfMassY ;
    this.totalMass;
    this.momentOfInertia = 1; //how hard is this thing to rotate? (higher = harder)
    this.translationalVelocity = createVector(1, 0);
    this.rotationalVelocity = createVector(.01);
    this.baseConfig(); //min components
  }

  calculateCenterOfMass() { //uses components positions and masses to calcualte center of mass
    this.totalMass = 0;
    let numeratorX = 0;
    let numeratorY = 0;
    for (let i = 0; i < this.component.length; i++) {
      this.totalMass += this.component[i].mass; //will be used later to sort of normalize the equation (not precise explanation)
      //calc polar offsets, then use parent.angle to find new x,y off on new ship

      numeratorX += this.component[i].x * this.component[i].mass; //in this way objects w/more mass will contribute more to CofM calculation
      numeratorY += this.component[i].y * this.component[i].mass;
    }
    this.centerOfMassX = numeratorX / this.totalMass;
    this.centerOfMassY = numeratorY / this.totalMass;
  }

  calculateMomentOfInertia() { //uses components distance FromCenterOfMass and masses to calcualte momentOfINertia
    //moment of inertia increases the further mass is away from the axis of rotation
    this.momentOfInertia = 1; //min momentOfInertia (to prevent ever dividing by 0)
    for (let i = 0; i < this.component.length; i++) {
      const deltaX = this.component[i].x - this.centerOfMassX;
      const deltaY = this.component[i].y - this.centerOfMassY;

      // console.log("dist")
      const distFromAxisOfRotationSquared = (sq(deltaX) + sq(deltaY));
      this.momentOfInertia += this.component[i].mass * distFromAxisOfRotationSquared;
      this.momentOfInertia *= .0001; //lower = more likely to rotate (constant to manually ajjust numbers)
    }

  }

  calculateComponentOffsets() {
    for (let i = 0; i < this.component.length; i++) { //cartesian to polar conversion
      let deltaX = this.component[i].x - this.centerOfMassX;
      let deltaY = this.component[i].y - this.centerOfMassY;

      let componentXRelative;
      let componentYRelative;
      if (!(this.angle === 0)) { //if parent angle isn't 0 recalculates cartesian position of component so it doesn't calc angle/dist to parent as if parent had a 0 angle
        const distToParent = sqrt(sq(deltaX) + sq(deltaY));
        const angleToParent = atan2(deltaY, deltaX);

        componentXRelative = cos(angleToParent - this.angle) * distToParent;
        componentYRelative = sin(angleToParent - this.angle) * distToParent;
      } else {
        componentXRelative = deltaX;
        componentYRelative = deltaY;
      }
      this.component[i].distToParent = sqrt(sq(componentXRelative) + sq(componentYRelative));
      this.component[i].angleToParent = atan2(componentYRelative, componentXRelative);
    }
  }

  alterComponents() {
    this.calculateCenterOfMass();
    this.calculateMomentOfInertia();
    this.calculateComponentOffsets();

  }

  addTranslationalForce(forceAngle, forceMag){     //calculate change in translational velocity using polar to cartesian conversion
    this.translationalVelocity.x += cos(forceAngle) * forceMag;
    this.translationalVelocity.y += sin(forceAngle) * forceMag;
  }

  addForceWithTorque(forceOriginX, forceOriginY, forceAngle, forceMag) {
      //calculate change in translational velocity using polar to cartesian conversion
    this.addTranslationalForce(forceAngle,forceMag);

    //calculate torque/change in rotational velocity
    //
    //find dist from origin of forceVec to CenterOfMass
    const deltaX = forceOriginX - this.centerOfMassX; //x compnent of dist from centerofmass to origin of vector
    const deltaY = forceOriginY - this.centerOfMassY; //y compnent of dist from centerofmass to origin of vector
    const distFromCenterOfMassToForceOrigin = sqrt(sq(deltaX) + sq(deltaY)); //dist from centerofmass to origin of vector
    const angleFromOriginToForce = atan2(deltaY, deltaX); //finding angle to imaginary radius which the force is applying itself to
    const deltaAnglefromOriginToForce = forceAngle - angleFromOriginToForce; //find angle difference of angle to imaginary radius relative to the angle of the vector
    const rotationaAcceleration = (distFromCenterOfMassToForceOrigin * sin(deltaAnglefromOriginToForce) * forceMag);
    const torque = rotationaAcceleration / this.momentOfInertia; //the higher the moment of inertia the harder it is to rotate
    this.rotationalVelocity.x += torque;
  }

  updatePosBasedOnVelocity() {
    this.centerOfMassX += this.translationalVelocity.x;
    this.centerOfMassY += this.translationalVelocity.y;

    this.angle += this.rotationalVelocity.x;
  }

  baseConfig(){
    //positions starting hull based on gamepad index
    const newComponent = new Component(this,this.centerOfMassX ,this.centerOfMassY,this.angle,random(20,80),1,null);
    this.component.push(newComponent);
    this.alterComponents();

  }
  update() {
    // if (gameMode === 1){ update physics for game
      //air resistance
      this.translationalVelocity.div(1.1);
      this.rotationalVelocity.div(1.3);
      this.updatePosBasedOnVelocity();
    // }

    for (let i = 0; i < this.component.length; i++) { //cartesian to polar conversion
      this.component[i].update();
    }

    this.displayCenterOfMass();
  }

  displayCenterOfMass(){
    fill(255, 255, 0, 20);
    ellipse(this.centerOfMassX, this.centerOfMassY, 20);
  }
}
