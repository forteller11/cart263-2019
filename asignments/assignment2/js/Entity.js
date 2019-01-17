class Entity{
  constructor(x,y,size,color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  display(){
    ellipse(this.x,this.y,this.size);
  }
}
