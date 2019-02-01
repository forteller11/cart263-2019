"use strict";
class Draggable extends Image{
  constructor(imageUrl,x=randomRange(0,window.innerWidth),y=randomRange(0,window.innerHeight),width=200,height=200){
    super.constructor(imageUrl,x,y,width,height);
    this.dragged = false;
    this.deltaMouseX = null;
    this.deltaMouseY = null;

    document.addEventListener('mousedown',(e)=>{
      if ((e.clientX < this.x+this.width)&&(e.clientX > this.x)){ //if mouse on image
        if ((e.clientY < this.y+this.height)&&(e.clientY > this.y)){
          this.dragging = true; //start dragging
          this.deltaMouseX = this.x - e.clientX;
          this.deltaMouseY = this.y - e.clientY;
        }
      }
    });

    document.addEventListener('mouseup',()=>{
      this.dragging = false;
    });

    document.addEventListener('mousemove',(e)=>{
      this.drag(e);
    });
  }

  drag(e){
    if (this.dragging === true){
      this.x = e.clientX + this.deltaMouseX;
      this.y = e.clientY + this.deltaMouseY;
    }
    this.updateStyle();
  }

}
