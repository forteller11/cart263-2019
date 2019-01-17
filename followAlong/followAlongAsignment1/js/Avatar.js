class Avatar extends Entity{

  constructor(x,y,size,color){
    super(x,y,size,color)
    this.alive = true;
    this.maxSize = size;
  }

  changePosition(){
    this.x = mouseX;
    this.y = mouseY;
  }

  decrementSize(){
    this.size -= .5;
    this.size = constrain(this.size,0,this.maxSize);

  }


  update(){
    this.changePosition();
    this.decrementSize();
    // super.display();
  }

}
