'use strict';

class Triangle{
  constructor(vecObj1,vecObj2,vecObj3){
    this.v1 = vecObj1;
    this.v2 = vecObj3;
    this.v3 = vecObj3;

    this.x = undefined; //avg x,y,z of vectors 1-3
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
    this.calcCenterPosition();
    this.distToCamera = pythag(v.x-this.x, v.y-this.y, v.z-this.z);
    if (this.distToCamera === undefined){
      console.log('UNDEFINEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
    }
    return this.distToCamera;
  }
}
