"use strict";
class Image {
  constructor(imageUrl, x = ran(window.innerWidth), y = ran(window.innerHeight), width = 200, height = 200) {
    let idle = document.createElement("IMG");
    idle.src = '../assets/faceIdle.png';
    let hover = document.createElement("IMG");
    hover.src = '../assets/faceHover.png';
    let drag = document.createElement("IMG");
    drag.src = '../assets/faceDrag.png';
    this.elements = [idle, hover, drag];
    this.container = document.getElementById("head");
    for (let element of this.elements) {
      this.container.appendChild(element);
      element.draggable = false;
      element.style.position = "absolute";
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.updateStyle();
  }

  updateStyle() { //update position and scale of image based on this.x,y,width,height vars
    for (let element of this.elements) {
      element.style.left = this.x + "px";
      element.style.top = this.y + "px";
      element.style.width = this.width + "px";
      element.style.height = this.height + "px";
    }

  }
}
