"use strict";
window.onload = main;
let player;
let sessionID;
let camera;
let spans = [];
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
  for (let i = 0; i < spans.length; i ++){ //update spans
    spans[i].update();
    if (spans[i].opacity <= 0){
      spans[i].delete();
      spans.splice(1,i);
    }
  }
}
