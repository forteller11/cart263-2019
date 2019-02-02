"use strict";
window.onload = main;
let players = [];
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

let socket;


function main() {
  //create textinput and child it to the body
  document.addEventListener("mousemove", trackMouseMovement);
  player = new Avatar();
  camera = new Camera(player);
  update();
  setInterval(update, updateTime);
}


function update() {
  player.update();
  camera.update();
  for (let i = 0; i < spans.length; i ++){ //update spans
    spans[i].update();
    if (spans[i].opacity <= 0){
      spans[i].delete();
      spans.splice(1,i);
    }
  }
}
