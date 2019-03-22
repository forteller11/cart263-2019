class Graphic{
  constructor(type,x,y){
    this.type = type;
    this.x = x;
    this.y = y;
    let hue = mapFromRanges(this.y,0,window.innerHeight,0,360);
    let sat = 100;
    let lit = 50;
    this.color = `hsl(${hue},${sat}%,${lit}%)`; //string rgba()
    this.startingSize = 500;
    this.lifeSpan = 500;
    this.life = 0;
    switch (this.type) {
      case 'synth':
        this.growth = -1;
        this.lifeSpan = 10;
        this.startingSize = ran(20,25);
        break;
      case 'kick':
      this.growth = 2;
      this.lifeSpan = 2;
      this.startingSize = ran(10,15);
        break;
      case 'snare':
      this.growth = -1;
      this.lifeSpan = 10;
      this.startingSize = ran(10,15);
        break;
      case 'hihat':
      this.growth = 5;
      this.lifeSpan = 1;
      this.startingSize = ran(10,15);
        break;

    }
  }

  update(){
    let index = this.life/this.lifeSpan * Math.PI/2;

    let dynamicSize = (Math.sin(index)*this.startingSize*this.growth) + this.startingSize;

    canvasCtx.fillStyle = this.color;
    canvasCtx.fillRect(this.x - dynamicSize / 2, this.y - dynamicSize / 2, dynamicSize, dynamicSize);
    // switch (this.type) {
    //   case 'synth':
    //     synths[i].frequency = frequency;
    //     synths[i].play()
    //     console.log(synths[i]);
    //     break;
    //   case 'kick':
    //     kicks[i].frequency = frequency;
    //     kicks[i].play()
    //     break;
    //   case 'snare':
    //     snares[i].frequency = frequency;
    //     snares[i].play()
    //     break;
    //   case 'hihat':
    //     hihats[i].frequency = frequency;
    //     hihats[i].play()
    //     break;
    // }

    this.life++;
  }
}
