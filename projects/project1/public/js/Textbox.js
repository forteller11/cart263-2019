/*
this is the textbox class which handles the creation of the html input element,
and it's position and size on the page.

Instances of the textbox class represent OTHER clients on the server.

the textboxes value (the characters in the textbox) are not changed by the client
thsemlf but rather OTHER clients through the server, in the same way, while the client
activiely repositions the textbox based on its x,y targets it does not change these
targets themself but rather OTHER clients change these values and it gets this data
through the server.
*/
"use strict";
class Textbox {
  constructor(id = null,
  value = 'shout into the void',
  x = ran(window.innerWidth/2)+window.innerWidth/4,
  y = ran(window.innerheight/2)+window.innerHeight/4,
  targX=null,
  targY=null) {

    this.id = id;
    this.minWidth = 32;
    this.maxWidth = 200;
    this.currentWidth = this.minWidth;
    this.height = 16;

    //creating and initialising html textinput element
    this.element = document.createElement("INPUT");
    this.element.setAttribute("type", "text");
    body[0].appendChild(this.element);
    this.element.value = value;
    this.element.style.position = "fixed"; //like postiion absolute but doesn't scroll
    this.element.style.width = this.currentWidth + "px";
    this.element.style.height = "auto";
    this.element.style.transition = "width 0s";
    this.element.style.transitionTimingFunction = "ease";;
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";

    this.x = x; //reffering to left of textbox + this.posOffset
    this.y = y; // reffering the vertical center of the textbox

    this.targetX = targX;
    this.targetY = targY;

    this.posOffset = charSize / 8; // so that retargeting the textbox comes to rest still within the mouse pointer (instead of ats its edge)
    this.toTargetMovespeed = .085 * updateTime / 16.7; //max percentage to transport to target per frame
    this.toTargetMaxMovespeed = 5.5 * updateTime / 16.7; //max movespeed in pixels to target per frame
    this.toTargetMoveVector = new Vector(0, 0);

    this.element.addEventListener('input', (e) => { //if textbox.value changes, ajust width
      console.log('inputs changed');
      this.ajustWidth();
    });
    this.ajustWidth();
  }

  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    this.moveTowardsTarget();
    this.element.style.left = (this.x - this.posOffset) - camera.x + "px";
    this.element.style.top = (this.y - this.height / 2) - camera.y + "px";
  }

  moveTowardsTarget() { //based on targets and movespeeds change x,y positions
    if (!((this.targetX || this.targetY) === null)) { //if there is a target...
      //find difference between target and current position
      const deltaX = this.targetX - this.x;
      const deltaY = this.targetY - this.y;
      //use percentage of that delta to find movespeed in pixels
      let moveX = deltaX * this.toTargetMovespeed;
      let moveY = deltaY * this.toTargetMovespeed;
      this.toTargetMoveVector.x = moveX;
      this.toTargetMoveVector.y = moveY;

      this.toTargetMoveVector.constrainMag(this.toTargetMaxMovespeed); //constrain vector
      //actually moved based on these calculations change x,y
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

  handleKeyboardInputs(keyCode) {
    //this receives keyboard inputs frome even lsiteners
    //changes the property of the textbox somehow in response to these inputs
    console.log("id:"+this.id);
    console.log("keyCOde:"+keyCode)
    let amountToChangeX; //how much to change targetX after method
    let amountToChangeY; //how much to change this.targetY after method

    switch (keyCode) { //calculate how to change target based on key codes
      case 9: //tab
        amountToChangeX = charSize * 3;
        amountToChangeY = 0;
        break;
      case 13: //ENTER
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
    } else { //if there is a target the textbox is heading towards, offset it
      this.targetX += amountToChangeX;
      this.targetY += amountToChangeY;
    }
  }

  ajustWidth() { //changes width of textbox, either with a css transition or instantly
    const horzWidthOfText = (charSize / 2 + letterKerningSpace + .79) * this.element.value.length;

    if (horzWidthOfText > this.minWidth) { //if increasing in size, instantly become the new width
      this.element.style.transition = "width 0s";
      this.currentWidth = horzWidthOfText;
      this.element.style.width = this.currentWidth + "px";
    } else if (horzWidthOfText < this.minWidth) { //if decreasing in size, transition to that size smoothly
      this.element.style.transition = "width .3s"; //when enter is pressed, ease the textbox back to it's minSize
      this.currentWidth = this.minWidth;
      this.element.style.width = this.currentWidth + "px";
    }
  }

}
