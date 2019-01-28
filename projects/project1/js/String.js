"use strict";
class String {
  constructor(string, x, y, initialVelX, initialVelY) {
    this.string = string;
    this.element = document.createElement("span");
    this.element.innerHTML = this.string;
    this.element.style.position = "fixed";
    this.element.style.overFlow = "none";
    this.width = string.length*charSize/1.46;
    this.height = charSize;
    this.element.style.width = this.width + "px"; //have to set width property so it doesn't wrap on edge of screen
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";
    this.opacity = 1;
    // this.opacityFade = randomRange(-0.0001,-0.00001);
    this.opacityFade = -0.005;
    body[0].appendChild(this.element);
    this.charSize = charSize + "px";

    this.x = x;
    this.y = y;

    this.element.style.left = (this.x - camera.x) + "px";
    this.element.style.top = (this.y - camera.y) + "px";
  }
  update() {
      this.element.style.left = (this.x - camera.x) + "px";
      this.element.style.top = (this.y - camera.y) + "px";
      this.fade();
      }
      fade(){
        this.opacity += this.opacityFade;
        this.element.style.opacity = this.opacity;
      }
  deleteElement(){
    this.element.remove();
  }
}
