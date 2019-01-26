"use strict";
window.onload = main;
let player;
let particles = [];
let mouseX = 0;
let mouseY = 0;
const charSize = 16;
const letterKerningSpace = 2;
let body = document.getElementsByTagName("body");
const maxParticles = 1200;

function main() {
  //create textinput and child it to the body
  document.addEventListener("click", trackMouseMovement);
  player = new Player(charSize*3.2, 16); //instatiate player with reference to newly created text input
  player.update();

  setInterval(update, 10);
}

function update() {
  player.update();
  for (let i = 0; i < particles.length; i++) {
    particles[i].fade();
    if (particles[i].opacity <= 0){
      console.log("spliced particle "+i);
      particles[i].deleteElement();
      particles.splice(i,1);
    }
  }
}

function trackMouseMovement(e) { //store position of mouse in global variables
  mouseX = e.clientX; //"client" means get pos of mouse relative to window pos (and not monitor pos)
  mouseY = e.clientY;
  //if mouse not current within textbox, begin moving textbox to mouse location
  if (checkPointWithRectangleOverlap(mouseX, mouseY, player.x, player.y, player.width, player.height) === false) {
    player.targetX = e.clientX;
    player.targetY = e.clientY;
  }
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
