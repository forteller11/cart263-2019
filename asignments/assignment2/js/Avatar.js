class Avatar extends Entity{

  constructor(x,y,size,color){
    super(x,y,size,color)
    this.alive = true;
    this.maxSize = size;
    this.velocity = createVector(0,0);
  }

  changePosition(){
    this.velocity.x = (mouseX-this.x);
    this.velocity.y = (mouseY-this.y);
    this.x = mouseX;
    this.y = mouseY;
  }

  decrementSize(){
    this.size = this.size*.99;
    this.size = this.size -.1
    this.size = constrain(this.size,0,this.maxSize*3);

  }


  update(){
    // console.log(this.velocity.x);
    this.changePosition();
    this.decrementSize();
  }
  display(){
    fill(this.color);
    noStroke();
    super.display();
  }

}
