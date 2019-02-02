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
    this.enterKeyForce = 5; //force appllied to textbox on press of enter
    this.arrowKeyForce = .5135; //force applied to textbox on left/right arrow key press
    const self = this;

    this.retargeting = false;

    this.element.addEventListener("input", ajustWidth);
    ajustWidth();

    function ajustWidth() {
      const horzWidthOfText = (charSize / 2 + letterKerningSpace + .79) * self.element.value.length;
      if (horzWidthOfText > self.minWidth) {
        self.element.style.width = horzWidthOfText + "px";
        self.currentWidth = horzWidthOfText;
      } else if (horzWidthOfText < self.minWidth) {
        self.element.style.transition = "width .3s"; //when enter is pressed, ease the textbox back to it's minSize
        self.element.style.width = self.minWidth + "px";
        self.currentWidth = self.minWidth;
      }
    }

    this.element.addEventListener("keydown", (e) => {
      if (e.keyCode === 8) {
        ajustWidth();
      }
    });
    this.element.addEventListener("keypress", function(e) { //trigger if key is pressed in the textbox
      self.element.style.transition = "width 0s"; //if typing, instantly increase width of textbox
      if (e.keyCode === 13) { //if enter is pressed
        const xx = (self.x - self.posOffset) + 2;
        const yy = self.y - self.height / 2 + .8;
        const initialVelY = 0;
        const initialVelX = 0;
        let newStringElement = new String(self.element.value, xx, yy, initialVelX, -initialVelY);
        spans.push(newStringElement);

        self.changeTargetBasedOnArrowKeys(0, lineSpace, 1); //move down by one line space
        self.element.value = "";
        ajustWidth();
      }
    });

    this.element.addEventListener("keydown", (e) => {
      this.changeTargetBasedOnArrowKeys(e.keyCode); //move one characterSPace left
    });


    document.addEventListener("mousedown", function(e) { //on mouse click,
      //check to see if mouse overlaps textbox,
      if (self.pointWithRectOverlap(mouseX, mouseY, self.x - camera.x, self.y - camera.y, self.currentWidth, self.height) === false) {
        self.retargeting = true; //if not, begin selecting mouse as target to travel to
      }
    })

    document.addEventListener("mouseup", function(e) { //on release of mouse button
      self.element.focus(); //automatically select textbox (place cursor inside of it so user can type right away)
      self.retargeting = false; //stop targeting mouse position
    })

  }

  changeTargetBasedOnArrowKeys(keyCode) {
    let amountToChangeX; //how much to change targetX after method
    let amountToChangeY; //how much to change this.targetY after method

    switch (keyCode) { //calculate how to change target based on key codes
      case 37: //left arrow key
        charSize = 0;
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

  }
