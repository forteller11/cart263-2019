"use strict";
class Avatar extends Textbox { //like textbox, but listens for keyboard input
  constructor(id=null, value='shout into the void', x = ran(window.innerWidth), y = ran(window.innerHeight)) {
    super(id,value,x,y);

    this.mouseOverTextBox = false; //is mouse over text input element?
    this.retargeting = false;

    document.addEventListener("keydown", (e) => { //trigger if key is pressed in the textbox
      this.handleKeyboardInputs(e.keyCode);
      let textboxInputData = { //create literal object to send to server
        x: this.x,
        y: this.y,
        value: this.element.value,
        id: this.id,
        keyCode: e.keyCode
      }
      socket.emit('textboxInput',textboxInputData);
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
  handleKeyboardInputs(keyCode){
    if (keyCode === 13){ //if enter is pressed spawn span
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
      socket.emit('newSpan',spanBlueprintData);

      this.element.value = '';
      this.ajustWidth();
    }

    super.handleKeyboardInputs(keyCode);
  }
  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    if (this.retargeting) { //if targeting the mouse, change target to equal the mouse position
      let retargetingData = { //send data to server
        id: this.id,
        targetX: this.targetX,
        targetY: this.targetY
      }
      socket.emit('retargeting',retargetingData);

      this.targetX = mouseX + camera.x;
      this.targetY = mouseY + camera.y;
    }
    super.update();
  }

}
