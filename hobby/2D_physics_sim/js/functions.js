"use strict";
function addGamepadEventListenersToWindow(){
  //once gp is connected, trigger the gamepadhandler function with appropriate parameters
  window.addEventListener("gamepadconnected", function(gamepadEvent) { //once gamepad is connected, executes function with parameter being gamepad input event
    gamepadHandler(gamepadEvent, true, this);
    if (!(player[gamepadEvent.gamepad.index] === null)){ //make sure if gp is connected and is same index as already spawned player then it associates w/the player
      player[gamepadEvent.gamepad.index].gp = gamepadEvent.gamepad;
      console.log("reconnected to associated player?");
    }
  });

  window.addEventListener("gamepaddisconnected", function(gamepadEvent) {
    gamepadHandler(gamepadEvent, false, this);
    if (!(player[gamepadEvent.gamepad.index] === null)){ //make sure if the gp was associated w/a player then the player knows the controller is disconnected
      player[gamepadEvent.gamepad.index].gp = null;
    }
  });
}

function gamepadHandler(gpEvent, connecting, self) { //responsible for storing id of connected gp(s) in gamepadArr[] for later use
  let gp = gpEvent.gamepad; //direct reference to gp obj through gpEvent obj
  if (connecting) { //store gp in gp array
    gamepadArr[gp.index] = gp;
    console.log("GP index %d %s %d buttons %d axes",
      gp.index, gp.id, gp.buttons.length, gp.axes.length);
  } else {
    gamepadArr[gpEvent.gamepad.index] = null; //reset array/empty appropriate index of gamepadArr
    console.log("GP index %d is disconnected", gpEvent.gamepad.index, gpEvent.gamepad.id); //here i use the event info instead of a reference to the gp obj because it has been disconnected from the system
  }
}
function handleSpawningPlayerWithGamepads(){
  for (let i = 0; i < gamepadArr.length; i++) { //check for gp inputs
    if (!(gamepadArr[i] === null)) { //if gamepad is connected in this slot
      if ((gamepadArr[i].buttons[0].pressed) && (player[i] === null)){ //if this button is pressed and no player with this controller exists...

        player[i] = new Player(gamepadArr[i], new PhysicsObject((i+1)*width/5,(i+1)*height/5,0));
      }
    }
  }
}
