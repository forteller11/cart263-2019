/*
the avatar class represents the players avatar and has the same functionality as
the textbox except its movements are not controlled by the server but rather by
inputs from the player/browser/client directly.
Therefore functionally the Avatar extends the textbox class mainly just through
adding event listeners for keyboard and mouse inputs, which also then send this
data to other clients through the server.

what is crucial here is that the avatar immediately responds to a users actions
and DOESN'T have to wait for the server to confirm its inputs, because users don't
physically interact (no hitboxes) this immediacy poses no problems of contradictory
sims happening on two seperate clients (for instance one client thinks it ran into another,
but the other client does not agree) and it means that there will be no lag felt
by the users.
*/
"use strict";
class Avatar extends Textbox {
  constructor(id = null,
  value = 'shout into the void',
  x = ran(window.innerWidth/2)+window.innerWidth/4,
  y = ran(window.innerHeight/2)+window.innerHeight/4,
  targX=null,
  targY=null) {

    super(id, value, x, y, targX, targY);

    this.mouseOverTextBox = false; //is mouse over text input element?
    this.retargeting = false;

    document.addEventListener("keydown", (e) => { //trigger if key is pressed in the textbox
      this.handleKeyboardInputs(e.keyCode);;
    });

    this.element.addEventListener('input', () => { //send data to server everytime textbox is inputted.
      this.emitValueChange();
    });

    //hitbox handling
    this.element.addEventListener('mouseenter', () => {
      this.mouseOverTextBox = true;
    });
    this.element.addEventListener('mouseleave', () => {
      this.mouseOverTextBox = false;
    });

    //handle retargeting with the mouse
    document.addEventListener("mousedown", (e) => { //on mouse click,
      if (!(this.mouseOverTextBox)) {
        this.retargeting = true;
      }
    })
    document.addEventListener("mouseup", (e) => { //on release of mouse button
      this.element.focus(); //automatically select textbox (place cursor inside of it so user can type right away)
      this.retargeting = false; //stop targeting mouse position
    })
  }

  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    if (this.retargeting) { //if targeting the mouse, change target to equal the mouse position
      this.emitRetargetingData();
      this.targetX = mouseX + camera.x;
      this.targetY = mouseY + camera.y;
    }
    super.update();
  }

  handleKeyboardInputs(keyCode) {
    //extends this method by adding a response if enter is pressed,
    //also now the method emits any targets that have been changed as a result of execution

    let targetXStore = this.targetX;
    let targetYStore = this.targetY;
    if (keyCode === 13) { //if enter is pressed spawn a new span
      const xx = (this.x - this.posOffset) + 2;
      const yy = this.y - this.height / 2 + .8;
      let newSpan = new Span(this.element.value, xx, yy);
      console.log(newSpan);
      spans.push(newSpan);

      let spanBlueprintData = {
        string: newSpan.string,
        x: newSpan.x,
        y: newSpan.y
      }
      console.log('spanblueprintdata');
      console.log(spanBlueprintData);
      socket.emit('newSpan', spanBlueprintData); //send this newspan to all other clients

      this.element.value = ''; //remove all text (value) from textinput
      this.emitValueChange(); //send this value change (as the input event has not been triggered)
      this.ajustWidth();
    }

    super.handleKeyboardInputs(keyCode);

    //if any targets have changed due to this method
    if ((!(this.targetX === targetXStore)) || (!(this.targetY === targetYStore))) {
      this.emitRetargetingData();
    }
  }

  emitRetargetingData() { //send retargeting data to server
    let retargetingData = {
      id: this.id,
      x: this.x,
      y: this.y,
      targetX: this.targetX,
      targetY: this.targetY
    }
    socket.emit('retargeting', retargetingData);
  }

  emitValueChange(){ //send value change data to server
    console.log("input EVENT");
    let valueData = {
      id: this.id,
      value: this.element.value,
    }
    socket.emit('textboxValueChange', valueData);
  }
}
