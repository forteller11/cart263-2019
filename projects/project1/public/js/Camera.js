"use strict";
/*
the camera smoothly follows the avatar around the scene, it works by offsetting
the positioning of every single visble html element in the scene.
The camera moves asympotically meaning it never actually approaches its target as
it slows down infinitely, this gives the camera a very smooth feeling.
*/
class Camera{
  constructor(avatar, x=0,y=0){
    this.avatar = avatar;
    this.x = x;
    this.y = y;

    this.toTargetMovespeed = .005 * updateTime; //the % speed at which to move to target
    this.toTargetMaxMovespeed = Infinity;
    this.targetX = this.x;
    this.targetY = this.y;

  }
  update(){
    this.setTarget();
    this.moveTowardsTarget();
  }
  //
  setTarget(){ //try to center the avatar in the middle of the webpage
  this.targetX = (this.avatar.x) - window.innerWidth/2;
  this.targetY = (this.avatar.y) - window.innerHeight/2;
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
