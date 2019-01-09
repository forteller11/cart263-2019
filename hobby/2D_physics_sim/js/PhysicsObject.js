class PhysicsObject{
  constructor(angle = 0){
  this.component = [];
  this.angle = angle;
  this.centerOfMassX = width/2;
  this.centerOfMassY = height/2;
  this.totalMass;
  }

  calculateCenterOfMass(){ //uses components positions and masses to calcualte center of mass
    this.totalMass = 0;
    let numeratorX = 0;
    let numeratorY = 0;
    for (let i = 0; i < this.component.length; i ++){
      this.totalMass += this.component[i].mass; //will be used later to sort of normalize the equation (not precise explanation)
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

      this.component[i].radiusOff = sqrt(sq(deltaX)+sq(deltaY));
      this.component[i].angleOff = atan2(deltaY,deltaX);

      console.log("deltaX"+deltaX);
      console.log("radiusOff"+this.component[i].radiusOff);
      console.log("angleOff"+this.component[i].angleOff);
    }
  }
  checkCollisions(){

  }

  alterComponents() {
    // let angleStore = this.angle;
    // this.angle = 0;
    // for (let i = 0; i < this.component.length; i ++){ //cartesian to polar conversion
    //   if (!(this.component[i].xOff === null)){
    //     this.component[i].calcPos();
    //     console.log("hey");
    //   }
    // }
    this.calculateCenterOfMass();
    this.calculateComponentOffsets();
    // this.angle = angleStore;
  }

  update(){
    this.angle+= 0.01;
    //this.changePosBasedOnForce();
    fill(255,255,0);
    ellipse(this.centerOfMassX,this.centerOfMassY,20);
    for (let i = 0; i < this.component.length; i ++){ //cartesian to polar conversion
      this.component[i].update();
    }
  }
}
