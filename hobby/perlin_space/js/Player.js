"use strict";
class Player{
  constructor(x = width/2, y = height/2){
    this.x = x;
    this.y = y;
    this.moveSpeed = 4;
    this.width = 64;
    this.height = 16;
    this.textbox = document.getElementById("textbox");
    this.textbox.style.position = "absolute";
  }
  update(){
    console.log("woo");
    if (keyIsDown(LEFT_ARROW)){
      this.x -= this.moveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.x += this.moveSpeed;
    }
    if (keyIsDown(UP_ARROW)){
      this.y -= this.moveSpeed;
    }
    if (keyIsDown(DOWN_ARROW)){
      this.y += this.moveSpeed;
    }
    this.textbox.left = (this.x-this.width/2) + "px";
    this.textbox.top = (this.y-this.height/2) + "px";
  }
}
