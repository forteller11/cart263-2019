"use strict";
class Avatar extends Textbox { //like textbox, but listens for keyboard input and is responsible for camera object
  constructor(value='shout into the void',width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    super(value,width,height,x,y);
    this.mouseOverTextBox = false; //is mouse over text input element?
    this.retargeting = false;

    this.mouseOverTextBox = false; //is mouse over text input element?
    this.retargeting = false;

    this.ajustWidth();

    document.addEventListener("keydown", (e) => { //trigger if key is pressed in the textbox
      this.handleKeyboardInputs(e.keyCode);
    });

    this.element.addEventListener('input', (e) => { //if textbox.value changes, ajust width
      this.ajustWidth();
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
      this.targetX = mouseX + camera.x;
      this.targetY = mouseY + camera.y;
    }
    super.update();
  }

}
