"use strict";
let socket;
let playerX = 0;
let playerY = 0;
window.onload = main;

function setup() {
  createCanvas(200, 200);

  socket = io.connect('http://localhost:3000');
}

function draw(){
    background(51);
    ellipse(playerX,playerY,30);
}

function main (){
  console.log("main");
  document.addEventListener("mousemove",mouseMove);
}

function mouseMove(e){
  console.log("mouseDownFunction");
  playerX = e.clientX;
  playerY = e.clientY;

  let data = {
    x: e.clientX,
    y: e.clientY
  }
  socket.emit('emitData',data);
}
