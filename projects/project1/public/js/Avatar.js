/*
the avatar class represents the players avatar and has the same functionality as
the textbox except its movements are not controlled by the server but rather by
inputs from the player. Therefore the Avatar mainly just adds event listeners to
the textbox class which affect the textbox and also transmit that data to other clients

*/
"use strict";
class Avatar extends Textbox { //like textbox, but listens for keyboard input
  constructor(id = null, value = 'shout into the void', x = ran(window.innerWidth), y = ran(window.innerHeight)) {
    super(id, value, x, y);

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
    let targetXStore = this.targetX;
    let targetYStore = this.targetY;
    if (keyCode === 13) { //if enter is pressed spawn span
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
      socket.emit('newSpan', spanBlueprintData);

      this.element.value = '';
      this.emitValueChange();
      this.ajustWidth();
    }

    super.handleKeyboardInputs(keyCode);

    //if any targets have changed due to this method
    if ((!(this.targetX === targetXStore)) || (!(this.targetY === targetYStore))) {
      this.emitRetargetingData();
    }
  }

  emitRetargetingData() {
    let retargetingData = { //send data to server
      id: this.id,
      x: this.x,
      y: this.y,
      targetX: this.targetX,
      targetY: this.targetY
    }
    socket.emit('retargeting', retargetingData);
  }

  emitValueChange(){
    console.log("input EVENT");
    let valueData = {
      id: this.id,
      value: this.element.value,
    }
    socket.emit('textboxValueChange', valueData);
  }
}
