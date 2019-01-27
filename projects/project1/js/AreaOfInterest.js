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
    this.totalChars = 0; //total contained characters
    this.strings.push(string);
    this.containedCharacters = string.length;
    this.stringAvgX = null;
    this.stringAvgY = null;
  }
  addNewString(element){ //calcs avg center of all strings in this.stringsp[]
    console.log(element);
    if (this.stringAvgX === null){ //if first time executing this method on this object
      this.totalChars += element.string.length;
      this.stringAvgX = element.x + element.width/2;
      this.stringAvgY = element.y + element.height/2;

    } else { //if adding a string
      this.totalChars = this.totalChars += element.string.length;
      const lerpAmount = element.string.length/(this.totalChars); //influence of new string
      console.log("totalchars"+this.totalChars);
      console.log("element char length"+element.string.length);
      console.log("LERP AMOUNT:"+lerpAmount);
      this.stringAvgX = linearInterpolate(element.x+element.width/2,this.stringAvgX,lerpAmount);
      this.stringAvgY = linearInterpolate(element.y+element.height/2,this.stringAvgY,lerpAmount);
      console.log(this.stringAvgX);
      // console.log("string:"+Math.round(this.stringAvgY));
    }

    this.strings.push(element.string);
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
