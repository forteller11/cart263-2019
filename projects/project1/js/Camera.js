"use strict";

class Camera{
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;

    this.toTargetMovespeed = .01 * updateTime;
    this.toTargetMaxMovespeed = Infinity;
    this.targetX = this.x;
    this.targetY = this.y;

  }
  update(){
    this.setTarget();
    this.moveTowardsTarget();
  }
  setTarget(){ //perhaps only update every once in a while

    //have camera system work for n number of areas and
    let areaAvgX = [null];
    let areaAvgY = [null];
    let areaAvgInfluence = [null]; //how much that area's avg influences cam
    let sumCalculations = 0;
    let stringInfluence = 0;
    for (let i = 0; i < areasOfInterest.length; i ++){ //loop through all areas of interest,
      const distToAreaThreshold = areasOfInterest[i].radius*2; //threshold dist within which area starts effecting camera
      const deltaX = areasOfInterest[i].x - player.x;
      const deltaY = areasOfInterest[i].y - player.y;
      const distToArea = dist(deltaX,deltaY);
      console.log(distToArea);
      if (distToArea < distToAreaThreshold ){ //if player is within radius of circle
        areaAvgInfluence[i] = (distToAreaThreshold-distToArea)/distToAreaThreshold/2; //0-0.5
        areaAvgX[i] = areasOfInterest[i].stringAvgX;
        areaAvgY[i] = areasOfInterest[i].stringAvgY;
        sumCalculations ++;
      }
    }

    let finalAreaAvgInfluence;
    let finalAreaAvgX;
    let finalAreaAvgY;
    if (areaAvgX[0] === null){ //if there are areas within threshold
      let areaAvgXSum = 0;
      let areaAvgYSum = 0;
      let areaAvgInfluenceSum = 0;
      for (let i = 0; i < areaAvgX.length; i ++){ //total all influences of avgStringlocations of areas
        areaAvgXSum += areaAvgX * areaAvgInfluence;
        areaAvgYSum += areaAvgY * areaAvgInfluence;
        areaAvgInfluenceSum += areaAvgInfluence;
      }
      finalAreaAvgX = areaAvgXSum/areaAvgX.length;
      finalAreaAvgY = areaAvgXSum/areaAvgY.length;
      finalAreaAvgInfluence = areaAvgInfluenceSum/areaAvgY.length;

    } else {
      finalAreaAvgX = 0;
      finalAreaAvgY = 0;
      finalAreaAvgInfluence = 0;
    }

    let playerInfluence = 1-finalAreaAvgInfluence;

    this.targetX = ((player.x*playerInfluence) + (finalAreaAvgX*finalAreaAvgInfluence)) - window.innerWidth/2;
    this.targetY = ((player.y*playerInfluence) + (finalAreaAvgY*finalAreaAvgInfluence)) - window.innerHeight/2;
    // this.targetX = 0;
    // this.targetY = 0;
  }
  moveTowardsTarget(){
    //find difference between target and current position
    const deltaX = this.targetX-this.x;
    const deltaY = this.targetY-this.y;
    //use percentage of that delta to find movespeed in pixels
    let moveX = deltaX*this.toTargetMovespeed;
    let moveY = deltaY*this.toTargetMovespeed;
    //constrain that movespeed to set bounds in pixels
    moveX = constrain(moveX,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
    moveY = constrain(moveY,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
    //actually moved based on these calculations...
    this.x += moveX;
    this.y += moveY;
  }
}
