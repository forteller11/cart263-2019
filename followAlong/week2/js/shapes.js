"use strict";
class Square extends Particle{
  constructor(x,y,size){
    super(x,y,size);
  }
  display(){
    super.display();
    rect(this.x,this.y,this.size,this.size);
  }
}

class Circle extends Particle{
  constructor(x,y,size){
    super(x,y,size);
  }
  display(){
    super.display();
    ellipse(this.x,this.y,this.size);
  }
}

class Triangle extends Particle{
  constructor(x,y,size){
    super(x,y,size);
  }
  display(){
    super.display();
    const x1 = this.x+this.size;
    const x2 = this.x-this.size;
    const x3 = this.x;

    const y1 = this.y;
    const y2 = this.y+this.size;
    const y3 = this.y-this.size;
    triangle(x1,y1,x2,y2,x3,y3);
  }
}
