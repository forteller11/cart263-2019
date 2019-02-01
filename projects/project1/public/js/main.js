"use strict";
window.onload = main;
let player;
let sessionID;
let camera;
let areasOfInterest = []; //array of objects which contain close together strings
const updateTime = 16.7; //~60fps
let mouseX = 0;
let mouseY = 0;
const charSize = 16;
const lineSpace = 32;
const letterKerningSpace = 2;
let body = document.getElementsByTagName("body");
const maxstrings = 1200; //max character count of a page

function main() {
  //create textinput and child it to the body
  document.addEventListener("mousemove", trackMouseMovement);
  camera = new Camera(); //instantiate player
  player = new Player(charSize*3.39, charSize); //instatiate player with reference to newly created text input
  update();
  setInterval(update, updateTime);
}


function update() {
  camera.update();
  player.update();
  for (let i = 0; i < areasOfInterest.length; i ++){ //update areas
    areasOfInterest[i].update();
    if (areasOfInterest[i].elements.length <= 0){ //if areas contain no string objects, splice
      areasOfInterest.splice(i,1);
    }
  }
}

function trackMouseMovement(e) { //store position of mouse in global variables
  mouseX = e.clientX; //"client" means get pos of mouse relative to window pos (and not monitor pos)
  mouseY = e.clientY;
}

function constrain(varr, min, max) { //same functionality as p5's constrain();
  let varrConstrained = varr;
  if (varr > max) {
    varrConstrained = max;
  }
  if (varr < min) {
    varrConstrained = min;
  }
  return varrConstrained;
}

function checkPointWithRectangleOverlap(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
  if ((pointX >= rectX - rectWidth / 2) && ((pointX <= rectX + rectWidth / 2))) { //horz collision?
    if ((pointY >= rectY - rectHeight / 2) && ((pointY <= rectY + rectHeight / 2))) { //horz collision?
      return true;
    }
  }
  return false;
}

function randomRange(min, max) {
  const r = Math.random();
  const delta = max - min;
  return (r * delta) + min;
}

function distFromDelta(xComponent,yComponent){
  return Math.sqrt((xComponent*xComponent)+(yComponent*yComponent))
}

function linearInterpolate(value1,value2,lerpAmount){
  const valueDelta = value1 - value2; //find difference between values
  const lerpAdd = lerpAmount * valueDelta
  const lerpResult = lerpAdd + value2;
  return lerpResult;
}