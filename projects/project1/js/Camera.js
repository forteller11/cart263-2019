"use strict";

class Camera{
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;

    this.toTargetMovespeed = .005 * updateTime;
    this.toTargetMaxMovespeed = Infinity;
    this.targetX = this.x;
    this.targetY = this.y;

  }
  update(){
    this.setTarget();
    this.moveTowardsTarget();
  }
  //
  setTarget(){ //perhaps only update every once in a while
  //
  //   //have camera system work for n number of areas and
  //   let areaAvgX = [null];
  //   let areaAvgY = [null];
  //   let areaAvgInfluence = [null]; //how much that area's avg influences cam
  //   let stringInfluence = 0;
  //
  //   for (let i = 0; i < areasOfInterest.length; i ++){ //loop through all areas of interest,
  //     const distToAreaThreshold = areasOfInterest[i].radius; //threshold dist within which area starts effecting camera
  //     const deltaX = areasOfInterest[i].stringAvgX - player.x;
  //     const deltaY = areasOfInterest[i].stringAvgY - player.y;
  //     const distToArea = distFromDelta(deltaX,deltaY);
  //     // console.log(distToArea);
  //     if (distToArea < distToAreaThreshold ){ //if player is within radius of circle
  //       // console.log(Math.round(distToArea) + "<" + distToAreaThreshold);
  //       areaAvgInfluence[i] = (distToAreaThreshold-distToArea)/distToAreaThreshold; //0
  //       areaAvgInfluence[i] = Math.sin(areaAvgInfluence[i]*Math.PI)/2; //make the 0,1 range turn into, 0,1,0, where output is 1 when input is .5 (so it fades influence when textbox is on top of text)
  //       // console.log("LERP:"+areaAvgInfluence[i]);
  //       areaAvgInfluence[i] = constrain(areaAvgInfluence[i],0,.01);
  //       areaAvgX[i] = areasOfInterest[i].stringAvgX;
  //       areaAvgY[i] = areasOfInterest[i].stringAvgY;
  //     }
  //   }
  //
  //   let finalAreaAvgInfluence;
  //   let finalAreaAvgX;
  //   let finalAreaAvgY;
  //   if (!(areaAvgX[0] === null)){ //if there are areas within threshold
  //     let areaAvgXSum = 0;
  //     let areaAvgYSum = 0;
  //     let areaAvgInfluenceSum = 0;
  //     for (let i = 0; i < areaAvgX.length; i ++){ //total all influences of avgStringlocations of areas
  //       areaAvgXSum += areaAvgX[i];
  //       areaAvgYSum += areaAvgY[i];
  //       areaAvgInfluenceSum += areaAvgInfluence[i];
  //     }
  //     finalAreaAvgX = areaAvgXSum/areaAvgX.length;
  //     finalAreaAvgY = areaAvgYSum/areaAvgY.length;
  //     finalAreaAvgInfluence = areaAvgInfluenceSum/areaAvgY.length;
  //     console.log()
  //
  //   } else {
  //     finalAreaAvgX = player.x;
  //     finalAreaAvgY = player.y;
  //     finalAreaAvgInfluence = 0;
  //   }
  //
  //
  //   let playerInfluence = 1-finalAreaAvgInfluence;
  //
  //   this.targetX = ((player.x*playerInfluence) + (finalAreaAvgX*finalAreaAvgInfluence)) - window.innerWidth/2;
  //   this.targetY = ((player.y*playerInfluence) + (finalAreaAvgY*finalAreaAvgInfluence)) - window.innerHeight/2;

  this.targetX = (player.x) - window.innerWidth/2;
  this.targetY = (player.y) - window.innerHeight/2;
  }

  draw(){
    noFill();
    stroke(255,0,0);
    const xx = this.targetX+window.innerWidth/2;
    const yy = this.targetY+window.innerHeight/2;
    ellipse(xx,yy,20);
    fill(255,0,0);
    ellipse(this.x+window.innerWidth/2,this.y+window.innerHeight/2,10);
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
