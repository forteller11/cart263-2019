"use strict";
class Span {
  constructor(string, x, y) {
    //initialise element
    this.string = string;
    this.element = document.createElement("span");
    this.element.innerHTML = this.string;
    this.element.style.position = "fixed";
    this.element.style.overFlow = "none";
    this.width = this.string.length * charSize / 1.46;
    this.height = charSize;
    this.element.style.width = this.width + "px"; //have to set width property so it doesn't wrap on edge of screen
    this.element.style.fontSize = charSize + "px";
    this.element.style.letterSpacing = letterKerningSpace + "px";
    body[0].appendChild(this.element);

    this.opacity = 1;
    // this.opacityFade = randomRange(-0.0001,-0.00001);
    this.opacityFade = -0.00005;

    this.x = x;
    this.y = y;
  }
  update() {
    this.element.style.left = (this.x - camera.x) + "px";
    this.element.style.top = (this.y - camera.y) + "px";
    this.fade();
  }

  fade() {
    this.opacity += this.opacityFade;
    this.element.style.opacity = this.opacity;
  }

  delete() {
    this.element.remove();
  }

}
