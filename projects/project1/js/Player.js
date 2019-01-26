"use strict";
class Player {
  constructor(width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.minWidth = width;
    this.maxWidth = 200;
    this.height = height;
    this.posOffset = 2.1; //so that element isn't centered around center of textbox
    this.element = document.createElement("INPUT");
    this.element.setAttribute("type","text");
    body[0].appendChild(this.element);
    this.element.value = "shout into the void";
    this.element.style.position = "absolute";
    this.element.style.width = this.minWidth + "px";
    this.element.style.transition = "width 0s";
    this.element.style.transitionTimingFunction = "ease";
    this.element.style.height = this.height + "px";
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";

    this.x = x;
    this.y = y;

    this.targetX = this.x;
    this.targetY = this.y;

    this.toTargetMovespeed = .085; //max percentage to transport to target per frame
    this.toTargetMaxMovespeed = 8.5; //max movespeed in pixels to target per frame

    this.enterKeyForce = 5; //force appllied to textbox on press of enter
    this.arrowKeyForce = .5135; //force applied to textbox on left/right arrow key press
    const self = this;

    this.retargeting = false;

    this.element.addEventListener("input",ajustWidth);
    ajustWidth();
    function ajustWidth(){
      const horzWidthOfText = (charSize/2+letterKerningSpace+.79)*self.element.value.length;
      if (horzWidthOfText > self.minWidth){
        self.element.style.width = horzWidthOfText + "px";
      }
    }

    this.element.addEventListener("keypress",function(e){//trigger if key is pressed in the textbox
      self.element.style.transition = "width 0s"; //if typing, instantly increase width of textbox
      if (e.keyCode === 13){ //if enter is pressed
        self.element.style.transition = "width .3s"; //when enter is pressed, ease the textbox back to it's minSize
          const xx = (self.x - self.minWidth/2)+2;
          // const additionalX = (charSize/2+letterKerningSpace+.79)*i;
          // const xx = initialX+additionalX;
          const yy = self.y-self.height/2 + .5;
          const initialRandom = + randomRange(-.1,.1);
          // const initialVelY = ((i+2)/8) + 2;
          const initialVelY = 0;
          const initialVelX = 0;
          strings.push(new String(self.element.value,xx,yy,initialVelX,-initialVelY));

          if (strings.length > maxstrings){ //delete first strings so that there are never more than max
            strings[0].deleteElement();
            strings.splice(0,1);
          }

        self.changeTargetBasedOnArrowKeys(0,lineSpace,1);
        self.element.value = "";
        self.element.style.width = self.minWidth + "px";
      }
    });

    this.element.addEventListener("keydown",function(e){
      if (e.keyCode === 37){ //left arrowkey
        self.changeTargetBasedOnArrowKeys(charSize,0,-1);
      }
      if (e.keyCode === 39){ //right arrowkey
        self.changeTargetBasedOnArrowKeys(charSize,0,1);
      }
      if (e.keyCode === 38){ //up arrowkey
        self.changeTargetBasedOnArrowKeys(0,lineSpace,-1);
      }
      if (e.keyCode === 40){ //down arrowkey
        self.changeTargetBasedOnArrowKeys(0,lineSpace,1);
      }
    });

    document.addEventListener("mousedown",function(e){ //on mouse click,
      //check to see if mouse overlaps textbox,
      if (self.pointWithRectOverlap(mouseX, mouseY, self.x, self.y, self.width, self.height) === false){
        self.retargeting = true; //if not, begin selecting mouse as target to travel to
      }
    })

    document.addEventListener("mouseup",function(e){ //on release of mouse button
      self.element.focus(); //automatically select textbox (place cursor inside of it so user can type right away)
      self.retargeting = false; //stop targeting mouse position
    })

  }

  changeTargetBasedOnArrowKeys(amountToChangeX,amountToChangeY,sign){
    if ((this.targetX === null)||(this.targetY === null)){ //if there is no target, have new target = current postiion + amountToChange
      this.targetX = this.x-(this.minWidth/this.posOffset) + (amountToChangeX * sign);
      this.targetY = this.y + amountToChangeY * sign;
    } else { //if there is a target, offset it
      this.targetX += amountToChangeX * sign;
      this.targetY += amountToChangeY * sign;
    }
  }
  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    if (this.retargeting){ //if targeting the mouse, change target to equal the mouse position
      this.targetX = mouseX;
      this.targetY = mouseY;
    }
    this.moveTowardsTarget();
    this.element.style.left = (this.x - this.minWidth / 2) + "px";
    this.element.style.top = (this.y - this.height / 2) + "px";
  }

  setTarget(pointX, pointY, rectX, rectY, rectWidth, rectHeight){   //if mouse not current within textbox, begin moving textbox to mouse location
    if (this.pointWithRectOverlap(pointX, pointY, rectX, rectY, rectWidth, rectHeight) === false){
      this.targetX = mouseX;
      this.targetY = mouseY;
    }



  }

  pointWithRectOverlap(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
    if ((pointX >= rectX - rectWidth / 2) && ((pointX <= rectX + rectWidth / 2))) { //horz collision?
      if ((pointY >= rectY - rectHeight / 2) && ((pointY <= rectY + rectHeight / 2))) { //horz collision?
        return true;
      }
    }
    return false;
  }
  moveTowardsTarget(){
    if (!((this.targetX || this.targetY ) === null)){
      //find difference between target and current position
      const deltaX = this.targetX-this.x+this.minWidth/this.posOffset;
      const deltaY = this.targetY-this.y;
      //use percentage of that delta to find movespeed in pixels
      let moveX = deltaX*this.toTargetMovespeed;
      let moveY = deltaY*this.toTargetMovespeed;
      //constrain that movespeed to set bounds in pixels
      moveX = constrain(moveX,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
      moveY = constrain(moveY,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
      //actually moved based on these calculations...
      this.x += moveX;
      this.y += moveY;

      if (dist(deltaX,deltaY) < .2){ //if very close to target, stop moving towards target
        this.targetX = null;
        this.targetY = null;
      }
    }

  }

}
