"use strict";
class Draggable extends Image{
  constructor(imageUrl,x=randomRange(0,window.innerWidth),y=randomRange(0,window.innerHeight),width=200,height=200){
    super(imageUrl,x,y,width,height);
    this.dragging = false;
    this.deltaMouseX = null;
    this.deltaMouseY = null;
    this.currentUrl = imageUrl;
    this.pickedUpUrl = imageUrl;
    this.onHoverUrl = imageUrl;
    this.idleUrl = imageUrl;

    document.addEventListener('mouseover',(e)=>{
      console.log('hover');
      if (!(this.currentUrl === this.pickedUpUrl)){
        this.currentUrl = this.onHoverUrl;
      }
    });

    document.addEventListener('mousedown',(e)=>{
      console.log('PRESS');
      if ((e.clientX < this.x+this.width)&&(e.clientX > this.x)){ //if mouse on image
        if ((e.clientY < this.y+this.height)&&(e.clientY > this.y)){
          this.currentUrl = this.onHoverUrl;
          this.dragging = true; //start dragging
          this.deltaMouseX = this.x - e.clientX;
          this.deltaMouseY = this.y - e.clientY;
        }
      }
    });

    document.addEventListener('mouseup',()=>{
      console.log("RELEASE");
      this.dragging = false;
      this.currentUrl = this.idleUrl;
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

  updateStyle(){
    super.updateStyle();
    this.element.src = this.currentUrl;
  }
}
