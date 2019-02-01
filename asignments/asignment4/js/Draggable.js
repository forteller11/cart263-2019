"use strict";
class Image{
  constructor(imageUrl,x=randomRange(0,window.innerWidth),y=randomRange(0,window.innerHeight),width=200,height=200){
    this.element = document.createElement("IMG");
    this.element.src = imageUrl;
    this.element.style.position = "absolute";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.updateStyle();
  }

  updateStyle(){ //update position and scale of image based on this.x,y,width,height vars
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }
}
