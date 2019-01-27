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

    this.element.addEventListener("keydown", function(e) {
      if (e.keyCode === 8) {
        ajustWidth();
      }
    });
    this.element.addEventListener("keypress", function(e) { //trigger if key is pressed in the textbox
      self.element.style.transition = "width 0s"; //if typing, instantly increase width of textbox
      if (e.keyCode === 13) { //if enter is pressed
        const xx = (self.x - self.posOffset) + 2;
        // const additionalX = (charSize/2+letterKerningSpace+.79)*i;
        // const xx = initialX+additionalX;
        const yy = self.y - self.height / 2 + .8;
        const initialRandom = +randomRange(-.1, .1);
        // const initialVelY = ((i+2)/8) + 2;
        const initialVelY = 0;
        const initialVelX = 0;
        let newString = new String(self.element.value, xx, yy, initialVelX, -initialVelY);
        strings.push(newString);

        if (!(areasOfInterest.length === 0)) { // if there are areas of interest
          let foundAreaForString = false;
          for (let area of areasOfInterest) {
            const deltaX = area.x - newString.x;
            const deltaY = area.y - newString.y;
            const distToAreaFromPlayer = distFromDelta(deltaX, deltaY);
            console.log(deltaY);
            console.log("dist:"+distToAreaFromPlayer + " < " + area.radius);

            if (distToAreaFromPlayer < area.radius/2) { //is string within radius of areaOfInterest? then...
              console.log("add to existing island");
              foundAreaForString = true; //remember that you find a suitable areaOfInterest
              area.strings.push(newString); //add string to areaOfInterest
              area.addNewString(newString);
              areasOfInterest.push(area);
              break; //break out of for loop
            }
          }
          if (foundAreaForString === false) { //if you went through whole loop and didn't find any close enough areasOfInterest
            // create one and add string to it
            let newArea = new AreaOfInterest(newString, newString.x, newString.y);
            areasOfInterest.push(newArea);
            newArea.addNewString(newString);
            console.log("create new areaOfInterest because past dist");
          }

        } else { //if there aren't any areas of interest
            let newArea = new AreaOfInterest(newString, newString.x, newString.y);
            areasOfInterest.push(newArea);
            newArea.addNewString(newString);
            console.log("create first areaOfInterest");
        }

        if (strings.length > maxstrings) { //delete first strings so that there are never more than max
          strings[0].deleteElement();
          strings.splice(0, 1);
        }
        self.changeTargetBasedOnArrowKeys(0, lineSpace, 1); //move down by one line space
        self.element.value = "";
        ajustWidth();
      }
    });

    this.element.addEventListener("keydown", function(e) {
      if (e.keyCode === 37) { //left arrowkey
        self.changeTargetBasedOnArrowKeys(charSize, 0, -1); //move one characterSPace left
      }
      if (e.keyCode === 39) { //right arrowkey
        self.changeTargetBasedOnArrowKeys(charSize, 0, 1); //move one character right
      }
      if (e.keyCode === 38) { //up arrowkey
        self.changeTargetBasedOnArrowKeys(0, lineSpace, -1); //move one line up
      }
      if (e.keyCode === 40) { //down arrowkey
        self.changeTargetBasedOnArrowKeys(0, lineSpace, 1); //move one line down
      }
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

  changeTargetBasedOnArrowKeys(amountToChangeX, amountToChangeY, sign) {
    if ((this.targetX === null) || (this.targetY === null)) { //if there is no target, have new target = current postiion + amountToChange
      this.targetX = this.x + (amountToChangeX * sign);
      this.targetY = (this.y + (amountToChangeY * sign));
    } else { //if there is a target, offset it
      this.targetX += (amountToChangeX * sign);
      this.targetY += (amountToChangeY * sign);
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
      //constrain that movespeed to set bounds in pixels
      moveX = constrain(moveX, -this.toTargetMaxMovespeed, this.toTargetMaxMovespeed);
      moveY = constrain(moveY, -this.toTargetMaxMovespeed, this.toTargetMaxMovespeed);
      //actually moved based on these calculations...
      this.x += moveX;
      this.y += moveY;

      if (distFromDelta(deltaX, deltaY) < .5) { //if very close to target, snap to target and stop moving torwards target
        this.x = this.targetX;
        this.y = this.targetY;
        this.targetX = null;
        this.targetY = null;
      }
    }

  }

}
