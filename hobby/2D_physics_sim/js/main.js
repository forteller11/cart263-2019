"use strict";

//references https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
let player = [null, null, null, null];
let gameMode = 0; //0 = buildMode, 1 = play/move mode
let gamepadArr = [null, null, null, null]; //arr of references to gamepad objs which provide access to states of connected gp(s)
let phyObjectArr = []; //containing all physics objects in the scne
function setup() {

addGamepadEventListenersToWindow();
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(51);
  handleSpawningPlayerWithGamepads();

  for (let i = 0; i < player.length; i ++){
    if (!(player[i] === null)){
      player[i].update();
      // console.log("updatingPlayer");
    }
  }
  if (keyCode === 48){
    gameMode = 0;
    console.log("gameMode:"+gameMode);
  }
  if (keyCode === 49){
    gameMode = 1;
    console.log("gameMode:"+gameMode);
  }

//handle collisions
}
