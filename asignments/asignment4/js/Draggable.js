"use strict";
class Draggable extends Image {
  constructor(imageUrl, x = ran(window.innerWidth), y = ran(window.innerHeight), width = 200, height = 200) {
    super(imageUrl, x, y, width, height);
    this.cooked = 1;
    this.hueMult = 90;
    this.dragging = false;
    this.deltaMouseX = null;
    this.deltaMouseY = null;
    this.hovering = false;
    console.log(this.x);
    for (let element of this.elements) {
      element.style.display = "none";
      element.draggable = false;
    }
    this.elements[0].style.display = "block";
    this.updateStyle();

    this.container.addEventListener('mouseover', (e) => {
      console.log('hover');
      this.hovering = true;
      if (this.dragging === false) { //dont overide dragg image
        for (let element of this.elements) {
          element.style.display = "none";
        }
        this.elements[1].style.display = "block";
      }
    });

    this.container.addEventListener('mouseleave', (e) => { //mouse off
      this.hovering = false;
      if (this.dragging === false) {
        console.log('mouseleave');
        for (let element of this.elements) {
          element.style.display = "none";
        }
        this.elements[0].style.display = "block";
      }
    });

    document.addEventListener('mouseleave', (e) => { //mouse off
      console.log('windowmouseout');
      this.dragging = false;
      for (let element of this.elements) {
        element.style.display = "none";
      }
      this.elements[0].style.display = "block";
    });

    this.container.addEventListener('mousedown', (e) => {
      console.log('PRESS');

      for (let element of this.elements) {
        element.style.display = "none";
      }
      this.elements[2].style.display = "block";

      this.dragging = true; //start dragging
      this.deltaMouseX = this.x - e.clientX;
      this.deltaMouseY = this.y - e.clientY;


    });

    document.addEventListener('mouseup', () => {
      console.log("RELEASE");
      this.dragging = false;
      for (let element of this.elements) {
        element.style.display = "none";
      }
      this.elements[1].style.display = "block";
    });

    this.container.addEventListener('mousemove', (e) => {
      this.drag(e);
    });
  }

  drag(e) {
    if (this.dragging === true) {
      this.x = e.clientX + this.deltaMouseX;
      this.y = e.clientY + this.deltaMouseY;
    }
    this.updateStyle();
  }

  updateStyle() {
    super.updateStyle();
    for (let element of this.elements) {
      element.style.filter = "hue-rotate(" + this.hueMult * this.cooked + "deg)";
    }
  }
}
