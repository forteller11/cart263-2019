"use strict";

//references https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
let player = [null, null, null, null];

let gamepadArr = [null, null, null, null]; //arr of references to gamepad objs which provide access to states of connected gp(s)

function setup() {

  function gamepadHandler(gpEvent, connecting, self) { //responsible for storing id of connected gp(s) for later use

    let gp = gpEvent.gamepad; //direct reference to gp obj through gpEvent obj
    if (connecting) { //store gp in gp array
      gamepadArr[gp.index] = gp;
      console.log("GP index %d %s %d buttons %d axes",
        gp.index, gp.id, gp.buttons.length, gp.axes.length);
    } else {
      // console.log(gpEvent.gamepad.index);
      gamepadArr[gpEvent.gamepad.index] = null; //reset array/empty it
      console.log("GP index %d is disconnected", gpEvent.gamepad.index, gpEvent.gamepad.id); //here i use the event info instead of a reference to the gp obj because it has been disconnected from the system
    }
  }

  //once gp is connected, trigger the gamepadhandler function
  window.addEventListener("gamepadconnected", function(gamepadEvent) { //once gamepad is connected, executes function with parameter being gamepad input event
    gamepadHandler(gamepadEvent, true, this);
  });

  window.addEventListener("gamepaddisconnected", function(gamepadEvent) {
    gamepadHandler(gamepadEvent, false, this);
    if (!(player[gamepadEvent.gamepad.index] === null)){ //make sure if the gp was associated w/a player then the player knows the controller is disconnected
      player[i].gp = null;
    }
  });

  createCanvas(windowWidth, windowHeight);
}


function draw() {
  for (let i = 0; i < gamepadArr.length; i++) { //check for gp inputs
    if (!(gamepadArr[i] === null)) { //if gamepad is connected in this slot
      if ((gamepadArr[i].buttons[0].pressed) && (player[i] === null)){ //if this button is pressed and no player with this controller exists...
        player[i] = new Player(gamepadArr[i]);
      }
      // console.log(gamepadArr[i]);
      // for (let j = 0; j < gamepadArr[i].axes.length; j ++){
      //   console.log(gamepadArr[i].axes[j]);
      // }

      // if (gamepadArr[i].buttons[2].pressed){
      //   console.log("I've been pressed!");
      // }
    }
  }
  // console.log(gamepadArr);
  background(51);

}
