"use strict";
class Player {
  constructor(width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.element = document.createElement("INPUT");
    this.element.setAttribute("type","text");
    body[0].appendChild(this.element);
    this.element.value = "shout into the void";
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";
    this.drag;
    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.targetX = this.x;
    this.targetY = this.y;

    this.velocity = new Vector(0,0);

    this.toTargetMovespeed = .05; //max percentage to transport to target per frame
    this.toTargetMaxMovespeed = 5; //max movespeed in pixels to target per frame

    const self = this;
    this.element.addEventListener("keypress",function(e){//trigger if key is pressed in the textbox
      if (e.keyCode === 13){ //if enter is pressed
        // console.log(self.element.value);
        const charArr = self.element.value.split(''); //array of characters in the textboxes value;
        // console.log(charArr);
        for (let i = 0; i < charArr.length; i ++){
          const initialX = (self.x - self.width/2)+2;
          const additionalX = (charSize/2+letterKerningSpace+.79)*i;
          const xx = initialX+additionalX;
          const yy = self.y-self.height/2 + 2;
          const initialRandom = + randomRange(-.1,.1);
          // const initialVelY = ((i+2)/8) + 2;
          const initialVelY = 0;
          const initialVelX = 0;
          particles.push(new Particle(charArr[i],charSize,xx,yy,initialVelX,-initialVelY));
          self.velocity.y += initialVelY/10;
        }
        if (!(self.element.value === "")){ //if textbox had any text when enter was pressed
          self.velocity.y += 5;
        }
        self.element.value = "";
      }
    });

  }
  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    this.moveTowardsTarget();
    this.x+= this.velocity.x;
    this.y+= this.velocity.y;
    this.velocity.div(this.drag);
    this.velocity.constrainMag(1);
    // console.log(this.velocity.y);

    this.element.style.left = (this.x - this.width / 2) + "px";
    this.element.style.top = (this.y - this.height / 2) + "px";
  }
  moveTowardsTarget(){
    if (!((this.targetX || this.targetY ) === null)){
      this.drag = 1.1;
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
      this.velocity.x += moveX;
      this.velocity.y += moveY;

      this.velocity.div(1.1);

      if (dist(deltaX,deltaY) < 6){ //if very close to target, stop moving towards target
        this.drag = 1.05;
        this.velocity.div(5);
        // console.log("arrived");
        this.targetX = null;
        this.targetY = null;
      }
    }

  }

}
