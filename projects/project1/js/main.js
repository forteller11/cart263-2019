"use strict";
window.onload = main;
let player;
let camera;
let strings = [];
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
  player = new Player(charSize*3.3, charSize); //instatiate player with reference to newly created text input
  player.update();

  setInterval(update, updateTime);
}

function update() {
  camera.update();
  player.update();
  for (let i = 0; i < strings.length; i++) {
    strings[i].update();
    if (strings[i].opacity <= 0){
      // console.log("spliced particle "+i);
      strings[i].deleteElement();
      strings.splice(i,1);
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

function dist(xComponent,yComponent){
  return Math.sqrt((xComponent*xComponent)+(yComponent*yComponent))
}
