//2D vector class
"use strict";
class Vector{
  constructor(x,y){
    console.log("vec created");
    this.x = x;
    this.y = y;
    this.mag = dist(this.x,this.y);
  }
  mag(){
    const newMag = dist(this.x,this.y);
    this.mag = newMag;
    return newMag;
  }
  div(divValue){
    const thetaStore = Math.atan2(this.y,this.x); //save angle
    this.mag = this.mag/divValue;
    this.x = Math.cos(thetaStore) * this.mag;
    this.y = Math.sin(thetaStore) * this.mag;
  }
}
