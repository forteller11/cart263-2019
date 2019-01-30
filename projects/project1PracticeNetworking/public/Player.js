class Player {
  constructor(x,y,id){
    this.x = x;
    this.y = y;
    this.id = id;
  }
  draw(){
    ellipse(this.x,this.y,20);
  }
}
