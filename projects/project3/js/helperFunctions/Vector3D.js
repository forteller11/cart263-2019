//barebones 2D vector class
"use strict";
class Vector {
  constructor(a1 = 1, a2 = 1, a3 = 1) {
    //if create mode===cartesian then a1 = x component and a2 = y component
    if (createMode === 'cartesian') {
      this.x = a1; //x component of vector
      this.y = a2; //y component of vector
      this.z = a3;
    }
    this.mag = distFromDelta(this.x, this.y, this.z);
  }

  mag() { //find the magnitude of this vetor
      console.log('undefined');
      const newMag = distFromDelta(this.x, this.y, this.z);
      this.mag = newMag;
      return newMag;
  }

  setMag(setMag) { //set mag and components to new mag
      const thetaStore = Math.atan2(this.y, this.x, this.z); //save angle of vector
      this.mag=setMag;

      const magDelta = this.mag - thetaStore;
      this.x = this.x * magDelta; //recalculate x component based on new mag
      this.y = this.y * magDelta; //recalculate y component based on new mag
      this.z = this.z * magDelta; //recalculate z component based on new mag
  }

  sub(v){ //subtract a vector from this vector
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.mag = distFromDelta(this.x, this.y, this.z);
  }

  add(v){ //add a vector from this vector
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.mag = distFromDelta(this.x, this.y, this.z);
  }

  div(divValue) { //divide vector by some magnitude
    this.mag /= divValue;
    this.x   /= divValue;
    this.y   /= divValue;
    this.z   /= divValue;
  }

  mult(multValue) { //divide vector by some magnitude
    this.mag *= multValue;
    this.x   *= multvalue;
    this.y   *= multValue;
    this.z   *= multValue;
  }

  constrainMag(max) { //make sure magnitude of vec isn't greator than "max"
    this.mag = distFromDelta(this.x, this.y, this.z);

    if (this.mag > max) { //if vector is larger than max
      toConstrainRatio = this.mag/max;
      this.mag = max; //set magnitude to max
      this.x   *= toConstrainRatio;
      this.y   *= toConstrainRatio;
      this.z   *= toConstrainRatio;
    }
  }

  angle() { //returns angle in radians of current vector
    console.log('angle return doesnt make sense in 3D')
    return Math.atan2(this.y, this.x); //save angle of vector
  }

  rotateZ(zAxis, yAxis, zAxis) { //rotate vector by __ radians
    this.mag = distFromDelta(this.x, this.y, this.z);
    const thetaStore = Math.atan2(this.y, this.x); //save angle of vector
    this.x = Math.cos(thetaStore + rotateAmount) * this.mag;
    this.y = Math.sin(thetaStore + rotateAmount) * this.mag;
  }

  rotateY(rotateAmount){
    this.mag = distFromDelta(this.x, this.y, this.z);
    const thetaStore = Math.atan2(this.z, this.x); //save angle of vector
    this.x = Math.cos(thetaStore + rotateAmount) * this.mag;
    this.z = Math.sin(thetaStore + rotateAmount) * this.mag;
  }

  rotateX(rotateAmount){
    this.mag = distFromDelta(this.x, this.y, this.z);
    const thetaStore = Math.atan2(this.z, this.y); //save angle of vector
    this.y = Math.cos(thetaStore + rotateAmount) * this.mag;
    this.z = Math.sin(thetaStore + rotateAmount) * this.mag;
  }

  projectOnTo(otherVector){ //dot product
    return (this.x*otherVector.x)+(this.y*otherVector.y)+(this.z*otherVector.z);
  }

}
