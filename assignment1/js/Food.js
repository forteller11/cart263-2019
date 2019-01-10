class Food{
  constructor(x = random(0,width),y = random(0,height),size = 64){
    this.velocity = createVector(0,10);
    this.maxSpeed = 19; //max magnitude of 0velocity vector
    this.x = 0;
    this.y = height/2;
    this.size = size; //diamatar of food

  }
  display(){
    push();
    noStroke();
    fill('#55cccc');
    ellipse(this.x,this.y,this.size);
    pop();
  }

  screenWrap(){
    //wrap horizontal with buffer that equals size/2
    if (this.x - this.size > width){
      this.x = 0 - this.size/2;
    } else if (this.x + this.size < 0) {
      this.x = width + this.size/2;
    }

    if (this.y - this.size > width){
      this.y = 0 - this.size/2;
    } else if (this.y + this.size < 0) {
      this.y = width + this.size/2;
    }
  }

  update(){
    //cart 253
    if (this.velocity.mag() > this.maxSpeed){
      this.velocity.setMag(this.maxSpeed);
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.screenWrap();
  }

}

//eo i fwn6 mwk4 twm4 mE
