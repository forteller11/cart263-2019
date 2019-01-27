"use strict";
/*
responsible for storing all strings within a given area, and knowing how many characters
in total it contains.
This is so the camera musn't itterate over all strings in the scene (which would
be expensive) to find areasOfInterest close enough to be of influence to the camera,
then when cam finds areasOfInterest close enough to matter it can itterate through individual strings
*/
class AreaOfInterest{
  constructor(string,x,y,radius =  window.innerHeight){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strings = [];
    this.strings.push(string);
    this.containedCharacters = string.length;
    this.stringAvgX = null;
    this.stringAvgY = null;
  }
  addNewString(string){ //calcs avg center of all strings in this.stringsp[]
    if (this.stringAvgX === null){ //if first time executing this method on this object
      this.stringAvgX = string.x + string.width/2;
      this.stringAvgY = string.y + player.height/2;
      console.log("string:"+string);
      console.log(player.y);
      console.log(this.stringAvgY);
    } else {
      this.stringAvgX += string.x + string.width/2;
      this.stringAvgY += string.y - player.height/2;

      this.stringAvgX = this.stringAvgX/2;
      this.stringAvgY = this.stringAvgY/2;
      console.log("player:"+Math.round(player.y));
      console.log("string:"+Math.round(this.stringAvgY));
    }
  }
  draw(){
    noFill();
    ellipse(this.x-camera.x,this.y-camera.y,this.radius);
    ellipse(this.stringAvgX-camera.x,this.stringAvgY-camera.y,16);

  }
  calculateCenterOfMass(){ //calculate avg string center, weighting strings depending on their length
    let stringSumX = 0;
    let stringSumY = 0;
    for (let string of strings){
      stringSumX += string.x;
      stringSumY += string.y;
    }
    const stringAvgX = stringSumX/strings.length;
    const stringAvgY = stringSumY/strings.length;
  }
  calculateCharactersContained(){
    this.containedCharacters = 0;
    for (let string of this.strings){ //add up all characters in every string
      this.containedCharacters += string.length;
    }
  }
}
