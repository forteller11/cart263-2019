//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";
class Vector{
  constructor(x=1,y=1){
    this.x = x; //x component of vector
    this.y = y; //y component of vector
    this.mag = distFromDelta(this.x,this.y); //magnitude of vector
  }

  mag(){ //find the magnitude of this vetor
    const newMag = distFromDelta(this.x,this.y);
    this.mag = newMag;
    return newMag;
  }

  div(divValue){ //divide vector by some magnitude
    this.mag = distFromDelta(this.x,this.y);
    const thetaStore = Math.atan2(this.y,this.x); //save angle of vector
    this.mag = this.mag/divValue; //divide magnitude
    this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
    this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
  }

  mult(multValue){ //divide vector by some magnitude
    this.mag = distFromDelta(this.x,this.y);
    const thetaStore = Math.atan2(this.y,this.x); //save angle of vector
    this.mag = this.mag*multValue; //divide magnitude
    this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
    this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
  }

  constrainMag(max){ //make sure magnitude of vec isn't greator than "max"
    this.mag = distFromDelta(this.x,this.y);

    if (this.mag>max){ //if vector is larger than max
      const thetaStore = Math.atan2(this.y,this.x); //save angle
      this.mag = max; //set magnitude to max
      this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
      this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
    }
  }
}
