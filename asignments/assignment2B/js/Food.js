class Food { //NEWWW
  constructor(x = random(0,width),y = random(0,height),size = 64){
    this.velocity = createVector(0,0); //velocity represented by p5 vector object
    this.maxSpeed = 5; //max magnitude of 0velocity vector
    this.x = x; //position x
    this.y = y; //position y

    this.noiseIncrement = 0.01; //rate at which to scan through perlin noise space (change input of perlin-noise function per frame)
    this.noiseIndexX = random(1000); //input to noise function which determines force to add to x component of velocity vector
    this.noiseIndexY = random(1000); //input to noise function which determines force to add to y component of velocity vector

    this.size = size; //diamatar of food

  }
  display(){ //represent the foods position and size via an appropriate ellpise
    push();
    noStroke();
    fill('#55cccc');
    ellipse(this.x,this.y,this.size);
    pop();
  }

  screenWrap(){
    //wrap horizontal
    if (this.x - this.size/2 > width){ //if past right hand side of canvas
      this.x = 0 - this.size/2;  //teleport to left side
    } else if (this.x + this.size < 0) { //if past left hand border of canvas
      this.x = width + this.size/2; //teleport to right side
    }

    //wrap vertical
    if (this.y - this.size/2 > width){ //if past bottom of canvas
      this.y = 0 - this.size/2; //teleport to top of canvas
    } else if (this.y + this.size < 0) { //if past top of canvas
      this.y = width + this.size/2; //teleport to bottom of canvas
    }
  }

  addForce(){ //use perlin noise to add speudo random forces (changing over time) to food velocity
    //increment inputs to perlin noise functions
    this.noiseIndexX += this.noiseIncrement;
    this.noiseIndexY += this.noiseIncrement;

    const forceAddMax = 5; //max velocity which can be added per frame
    //map outputs of perlin noise functions to -forceAddMax and forceAddMax
    const noiseForceAddX = map(noise(this.noiseIndexX),0,1,-forceAddMax,forceAddMax);
    const noiseForceAddY = map(noise(this.noiseIndexY),0,1,-forceAddMax,forceAddMax);

    //add these values to the food's velocity
    this.velocity.x += noiseForceAddX;
    this.velocity.y += noiseForceAddY;
  }

  update(){
    this.addForce();

    //limit maxium speed of food (via its magnitude and resulting (x,y)components)
    if (this.velocity.mag() > this.maxSpeed){
      this.velocity.setMag(this.maxSpeed);
    }

    //add velocity to position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.screenWrap();

  }

}

//eo i fwn6 mwk4 twm4 mE
