class Input {
  constructor() {

    let gamepadArr = [null, 233223, 3232, null]; //arr of references to gamepad objs which provide access to states of connected gp(s)
    // console.log(this.gamepads);
    console.log("gp array creation");
    console.log(gamepadArr);

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

    //once gp is connected, console.log and send a reference to the connect obj to the gamepad handler function
    window.addEventListener("gamepadconnected", function(gamepadEvent) { //once gamepad is connected, executes function with parameter being gamepad input event
      gamepadHandler(gamepadEvent, true, this);
    });

    window.addEventListener("gamepaddisconnected", function(gamepadEvent) {
      gamepadHandler(gamepadEvent, false, this);
    });


  }

  update() {
    console.log(gamepadArr);
    //   console.log("update input");
    //   // if (!(this.ship === undefined)){ //if inputs have created ships, update them
    //   console.log(this.ship);
    //     for (let i = 0; i < this.ship.length; i ++){
    //       this.ship[i].update();
    //       console.log("update ship"+i);
    //     }
    //   // }
  }
}
