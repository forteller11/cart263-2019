'use strict';

class Triangle{
  constructor(vertIndex01,vertIndex02,vertIndex03){
    this.v1 = vertIndex01;
    this.v2 = vertIndex02;
    this.v3 = vertIndex03;
    this.x = undefined;
    this.y = undefined;
    this.z = undefined;
    this.distToCamera = undefined;
    this.calcCenterPosition(); //sets x y to avg position of vertexes
  }
  calcCenterPosition(){
    this.x = mean(this.v1.x,this.v2.x,this.v3.x);
    this.y = mean(this.v1.y,this.v2.y,this.v3.y);
    this.z = mean(this.v1.z,this.v2.z,this.v3.z);
  }

  distTo(v){
    this.distToCamera = pythag(v.x-this.x, v.y-this.y, v.z-this.z);
    return this.distToCamera;
  }
}
