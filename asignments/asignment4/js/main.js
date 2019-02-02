"use strict";

window.onload = main;
let fly;
let mouth;
let body = [];

function main(){
  console.log("main");
  body = document.getElementsByTagName('body');
    console.log(body);
  fly = new Draggable('../assets/faceIdle.png');
  fly.pickedUpUrl = '../assets/faceDrag.png';
  fly.onHoverUrl = '../assets/faceHover.png';
  fly.idleUrl = '../assets/faceIdle.png';

console.log(min(-50,300,509900,200));
}
