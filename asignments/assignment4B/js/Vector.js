//barebones 2D vector class (only added methods needed for this specefic projects purposes)
"use strict";
class Vector {
  constructor(a1 = 1, a2 = 1, createMode = 'cartesian') {
    //if create mode===cartesian then a1 = x component and a2 = y component
    if (createMode === 'cartesian') {
      this.x = a1; //x component of vector
      this.y = a2; //y component of vector
    }
    //if createMode = polar then a1 === angle and a2 === magnitude
    if (createMode === 'polar') {
      this.x = Math.cos(a1) * a2;
      this.y = Math.sin(a1) * a2;
    }
  }

  mag() { //find the magnitude of this vetor
    const newMag = distFromDelta(this.x, this.y);
    this.mag = newMag;
    return newMag;
  }

  sub(v){ //subtract a vector from this vector
    this.x -= v.x;
    this.y -= v.y;
  }

  add(v){ //add a vector from this vector
    this.x += v.x;
    this.y += v.y;
  }

  div(divValue) { //divide vector by some magnitude
    this.mag = distFromDelta(this.x, this.y);
    const thetaStore = Math.atan2(this.y, this.x); //save angle of vector
    this.mag = this.mag / divValue; //divide magnitude
    this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
    this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
  }

  mult(multValue) { //divide vector by some magnitude
    this.mag = distFromDelta(this.x, this.y);
    const thetaStore = Math.atan2(this.y, this.x); //save angle of vector
    this.mag = this.mag * multValue; //divide magnitude
    this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
    this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
  }

  constrainMag(max) { //make sure magnitude of vec isn't greator than "max"
    this.mag = distFromDelta(this.x, this.y);

    if (this.mag > max) { //if vector is larger than max
      const thetaStore = Math.atan2(this.y, this.x); //save angle
      this.mag = max; //set magnitude to max
      this.x = Math.cos(thetaStore) * this.mag; //recalculate x component based on new mag
      this.y = Math.sin(thetaStore) * this.mag; //recalculate y component based on new mag
    }
  }

  radians() { //returns angle in radians of current vector
    return Math.atan2(this.y, this.x); //save angle of vector
  }

  rotate(rotateAmount) { //rotate vector by __ radians
    this.mag = distFromDelta(this.x, this.y);
    const thetaStore = Math.atan2(this.y, this.x); //save angle of vector
    this.x = Math.cos(thetaStore + rotateAmount) * this.mag;
    this.y = Math.sin(thetaStore + rotateAmount) * this.mag;
  }

}
