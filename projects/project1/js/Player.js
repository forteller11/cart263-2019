"use strict";
class Player {
  constructor(displayElement, width = 32, height = 8, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.element = displayElement;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }
  update() { //use x,y pos of element to style element (Using offsets to style it from center instead of top-left corner)
    this.x = mouseX;
    this.y = mouseY;
    this.element.style.left = (this.x - this.width / 2) + "px";
    this.element.style.top = (this.y - this.height / 2) + "px";
    console.log(player);
  }
}
