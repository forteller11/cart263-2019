"use strict";
class Fly{
  constructor(element,x,y){
    this.element = element;
    this.element.style.position = "absolute";
    this.width = 200;
    this.height = 200;
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;

    //set attribute to change mouth animation
    console.log(this);
    document.addEventListener('mousemove',(e)=>{
      this.update(e);
    });

    document.addEventListener('mousedown',(e)=>{
      if ((e.clientX < this.x+this.width)&&(e.clientX > this.x)){
        if ((e.clientY < this.y+this.height)&&(e.clientY > this.y)){
          this.dragging = true;
          this.deltaMouseX = this.x - e.clientX ;
          this.deltaMouseY = this.y - e.clientY;
        }
      }

    });

    document.addEventListener('mouseup',()=>{
      this.dragging = false;
    });
  }
  update(e){

    if (this.dragging === true){
      this.x = e.clientX + this.deltaMouseX;
      this.y = e.clientY + this.deltaMouseY;
    }
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }
}
