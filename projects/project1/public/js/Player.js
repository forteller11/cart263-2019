"use strict";
class Player {
  constructor(width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.minWidth = width;
    this.currentWidth = this.minWidth;
    this.maxWidth = 200;
    this.height = height;
    this.element = document.createElement("INPUT");
    this.element.setAttribute("type", "text");
    body[0].appendChild(this.element);
    this.element.value = "shout into the void";
    this.element.style.position = "fixed";
    this.element.style.width = this.minWidth + "px";
    this.element.style.transition = "width 0s";
    this.element.style.transitionTimingFunction = "ease";
    this.element.style.height = this.height + "px";
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";

    this.posOffset = charSize / 8; // so that when repositioning the textbox the mouse is still within it
    this.x = x; //reffering to left of textbox + this.posOffset
    this.y = y; // reffering the vertical center of the textbox

    this.targetX = null;
    this.targetY = null;

    this.toTargetMovespeed = .085 * updateTime / 16.7; //max percentage to transport to target per frame
    this.toTargetMaxMovespeed = 4.5 * updateTime / 16.7; //max movespeed in pixels to target per frame
    this.toTargetMoveVector = new Vector(0, 0);
    const self = this;

    this.mouseOverTextBox = false; //is mouse over text input element?
    this.retargeting = false;

    this.ajustWidth();

    document.addEventListener("keydown", (e) => { //trigger if key is pressed in the textbox
      this.handleKeyboardInputs(e.keyCode);
    });

    this.element.addEventListener('input', (e) => { //if textbox.value changes, ajust width
      console.log('input');
      this.ajustWidth();
    });

    //hitbox handling
    this.element.addEventListener('mouseenter', () => {
      this.mouseOverTextBox = true;
    });
    this.element.addEventListener('mouseleave', () => {
      this.mouseOverTextBox = false;
    });

    document.addEventListener("mousedown", (e) => { //on mouse click,
      //if mouse clicks and it is not current over textbox, retarget
      if (!(this.mouseOverTextBox)) {
        this.retargeting = true;
      }
    })

    document.addEventListener("mouseup", () => { //on release of mouse button
      this.element.focus(); //automatically select textbox (place cursor inside of it so user can type right away)
      this.retargeting = false; //stop targeting mouse position
    })

  }

  handleKeyboardInputs(keyCode) {
    let amountToChangeX; //how much to change targetX after method
    let amountToChangeY; //how much to change this.targetY after method
    switch (keyCode) { //calculate how to change target based on key codes
      case 9: //tab
        amountToChangeX = charSize * 3;
        amountToChangeY = 0;
        this.element.focus(); //refocus after pressing tab
        this.element.select(); //refocus after pressing tab
        break;
      case 13: //ENTER
        const xx = (this.x - this.posOffset) + 2;
        const yy = this.y - this.height / 2 + .8;
        const initialVelY = 0;
        const initialVelX = 0;
        let newStringElement = new String(this.element.value, xx, yy, initialVelX, -initialVelY);
        spans.push(newStringElement);
        this.element.value = '';
        this.ajustWidth();
        amountToChangeX = 0;
        amountToChangeY = lineSpace;
        break;
      case 37: //left arrow key
        amountToChangeX = -charSize;
        amountToChangeY = 0;
        break;
      case 39: //right arrow key
        amountToChangeX = charSize;
        amountToChangeY = 0;
        break;
      case 38: //up arrow key
        amountToChangeX = 0;
        amountToChangeY = -lineSpace;
        break;
      case 40: //down arrow key
        amountToChangeX = 0;
        amountToChangeY = lineSpace;
        break;
      default:
        return; //stop executing method
    }

    //actually change target based on above calculated values
    if ((this.targetX === null) || (this.targetY === null)) { //if there is no target, have new target = current postiion + amountToChange
      this.targetX = this.x + amountToChangeX;
      this.targetY = this.y + amountToChangeY;
    } else { //if there is a target, offset it
      this.targetX += amountToChangeX;
      this.targetY += amountToChangeY;
    }
  }

  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    if (this.retargeting) { //if targeting the mouse, change target to equal the mouse position
      this.targetX = mouseX + camera.x;
      this.targetY = mouseY + camera.y;
    }
    this.moveTowardsTarget();
    this.element.style.left = (this.x - this.posOffset) - camera.x + "px";
    this.element.style.top = (this.y - this.height / 2) - camera.y + "px";
  }

  pointWithRectOverlap(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
    if ((pointX >= rectX) && ((pointX <= rectX + rectWidth))) { //horz collision?
      if ((pointY >= rectY - rectHeight / 2) && ((pointY <= rectY + rectHeight / 2))) { //horz collision?
        return true;
      }
    }
    return false;
  }
  moveTowardsTarget() {
    if (!((this.targetX || this.targetY) === null)) {
      //find difference between target and current position
      const deltaX = this.targetX - this.x;
      const deltaY = this.targetY - this.y;
      //use percentage of that delta to find movespeed in pixels
      let moveX = deltaX * this.toTargetMovespeed;
      let moveY = deltaY * this.toTargetMovespeed;
      this.toTargetMoveVector.x = moveX;
      this.toTargetMoveVector.y = moveY;

      this.toTargetMoveVector.constrainMag(this.toTargetMaxMovespeed); //constrain mag (and coressponding components) of vector
      //actually moved based on these calculations...
      this.x += this.toTargetMoveVector.x;
      this.y += this.toTargetMoveVector.y;

      if (distFromDelta(deltaX, deltaY) < .5) { //if very close to target, snap to target and stop moving torwards target
        this.x = this.targetX;
        this.y = this.targetY;
        this.targetX = null;
        this.targetY = null;
      }
    }
  }

  ajustWidth() {
    const horzWidthOfText = (charSize / 2 + letterKerningSpace + .79) * this.element.value.length;
    if (horzWidthOfText > this.minWidth) { //if increasing in size, instantly become the new width
      this.element.style.transition = "width 0s";
      this.element.style.width = horzWidthOfText + "px";
      this.currentWidth = horzWidthOfText;
    } else if (horzWidthOfText < this.minWidth) { //if decreasing in size, transition to that size smoothly
      this.element.style.transition = "width .3s"; //when enter is pressed, ease the textbox back to it's minSize
      this.element.style.width = this.minWidth + "px";
      this.currentWidth = this.minWidth;
    }
  }

}
