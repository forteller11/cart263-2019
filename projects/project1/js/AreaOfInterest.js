"use strict";
/*
responsible for storing all strings within a given area, and knowing how many characters
in total it contains.
This is so the camera musn't itterate over all strings in the scene (which would
be expensive) to find areasOfInterest close enough to be of influence to the camera,
then when cam finds areasOfInterest close enough to matter it can itterate through individual strings
*/
class AreaOfInterest{
  constructor(element,x,y,radius =  window.innerHeight){
    this.x = x;
    this.y = y;
    this.elements = [];
    this.radius = radius;
    this.totalChars = 0; //total contained characters
    this.stringAvgX = null;
    this.stringAvgY = null;
    this.addNewString(element,1);
  }

  addNewString(element,add=1){ //calcs avg center of all strings in this.stringsp[]
    //if add = -1 then it effectevily removes point
    if (this.stringAvgX === null){ //if first time executing this method on this object
      this.totalChars += element.string.length;
      this.stringAvgX = element.x + element.width/2;
      this.stringAvgY = element.y + element.height/2;

    } else { //if adding a string
      this.totalChars = this.totalChars += element.string.length*add;
      const lerpAmount = element.string.length/(this.totalChars); //influence of new string
      // console.log("totalchars"+this.totalChars);
      // console.log("element char length"+element.string.length);
      // console.log("LERP AMOUNT:"+lerpAmount);
      this.stringAvgX = linearInterpolate(element.x+element.width/2,this.stringAvgX,lerpAmount*add);
      this.stringAvgY = linearInterpolate(element.y+element.height/2,this.stringAvgY,lerpAmount*add);
    }
    if (add === 1){
      this.elements.push(element);
    }
  }

    update(){
console.log("update area");
      for (let i = 0; i < this.elements.length; i ++){
        this.elements[i].update();
        if (this.elements[i].opacity <= 0){
          this.addNewString(this.elements[i],-1); //recalculate center of strings and this,totalchars
          this.elements[i].deleteElement();
          this.elements.splice(i,1);
        }
      }
    }


  draw(){
    stroke(0);
    noFill();
    ellipse(this.x-camera.x,this.y-camera.y,this.radius);
    ellipse(this.stringAvgX-camera.x,this.stringAvgY-camera.y,16);

  }


}
