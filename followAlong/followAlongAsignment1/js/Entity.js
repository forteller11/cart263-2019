class Entity{
  constructor(x,y,size,color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  display(){
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.size);
  }
}
