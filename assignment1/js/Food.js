class Food{
  constructor(x = random(0,width),y = random(0,height),size = 64){
    this.velocity = createVector(0,0);
    this.maxSpeed = 5; //max magnitude of 0velocity vector
    this.x = x;
    this.y = y;
    this.noiseIncrement = 0.001;
    this.noiseIndexX = random(1000);
    this.noiseIndexY = random(1000);
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
  addForce(){
    this.noiseIndexX += this.noiseIncrement;
    this.noiseIndexY += this.noiseIncrement;

    this.velocity.x += noise(this.noiseIndexX)-0.5;
    this.velocity.y += noise(this.noiseIndexY)-0.5;
  }
  update(){
    this.addForce();
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
