"use strict";
window.onload = main;
let player;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let body = document.getElementsByTagName("body");

function main(){
  //create textinput and child it to the body
  document.addEventListener("click",trackMouseMovement);
  let body = document.getElementsByTagName("body");
  player = new Player(body[0],128,16); //instatiate player with reference to newly created text input
  player.update();

  setInterval(update,10);
}

function update(){
player.update();
}

function trackMouseMovement(e){ //store position of mouse in global variables
  mouseX = e.clientX; //"client" means get pos of mouse relative to window pos (and not monitor pos)
  mouseY = e.clientY;
  //if mouse not current within textbox, begin moving textbox to mouse location
  if (checkPointWithRectangleOverlap(mouseX,mouseY,player.x,player.y,player.width,player.height) === false){
    player.targetX = e.clientX;
    player.targetY = e.clientY;
  }
}

function constrain(varr,min,max){ //same functionality as p5's constrain();
  let varrConstrained = varr;
  if (varr > max){
    varrConstrained = max;
  }
  if (varr < min){
    varrConstrained = min;
  }
  return varrConstrained;
}

function checkPointWithRectangleOverlap(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
  if ((pointX >= rectX-rectWidth/2) && ((pointX <= rectX+rectWidth/2))){ //horz collision?
    if ((pointY >= rectY-rectHeight/2) && ((pointY <= rectY+rectHeight/2))){ //horz collision?
      return true;
    }
  }
  return false;
}
