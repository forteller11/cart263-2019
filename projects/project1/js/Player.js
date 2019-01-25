"use strict";
class Player {
  constructor(width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.element = document.createElement("INPUT");
    this.element.setAttribute("type","text");
    body[0].appendChild(this.element);
    this.element.value = "ah";
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.fontSize = charSize + "px";

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.targetX = this.x;
    this.targetY = this.y;
    this.toTargetMovespeed = .05; //percentage to transport to target per frame
    this.toTagetMaxMovespeed = 5; //max movespeed in pixels to target per frame

    const self = this;
    this.element.addEventListener("keypress",function(e){//trigger if key is pressed in the textbox
      if (e.keyCode === 13){ //if enter is pressed
        // console.log(self.element.value);
        const charArr = self.element.value.split(''); //array of characters in the textboxes value;
        // console.log(charArr);
        for (let i = 0; i < charArr.length; i ++){
          const initialX = (self.x - self.width/2);
          const additionalX = charSize/2*i;
          const xx = initialX+additionalX;
          const initialVelY = ((i+2)/8) + randomRange(-.1,.1) + 2;
          const initialVelX = 0;
          particles.push(new Particle(charArr[i],16,xx,self.y,initialVelX,initialVelY))
        }
      }
    });

  }
  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    this.moveTowardsTarget();
    this.element.style.left = (this.x - this.width / 2) + "px";
    this.element.style.top = (this.y - this.height / 2) + "px";
  }
  moveTowardsTarget(){
    //find difference between target and current position
    const deltaX = this.targetX-this.x;
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
  }

}
