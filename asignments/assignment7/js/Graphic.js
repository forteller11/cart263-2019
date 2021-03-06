class Graphic {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    let hue = mapFromRanges(this.y, 0, window.innerHeight, 0, 360);
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
        this.startingSize = ran(20, 50);
        break;
      case 'kick':
        this.growth = 2;
        this.lifeSpan = 2;
        this.startingSize = ran(10, 15);
        break;
      case 'snare':
        this.growth = 1;
        this.lifeSpan = 1;
        this.startingSize = ran(25,60);
        break;
      case 'hihat':
        this.growth = 5;
        this.lifeSpan = 1;
        this.startingSize = ran(10,15);
        break;

    }
  }

  update() {
    let index = this.life / this.lifeSpan * Math.PI / 2;

    let dynamicSize = (Math.sin(index) * this.startingSize * this.growth) + this.startingSize;

    canvasCtx.fillStyle = this.color;
    // canvasCtx.fillRect(this.x - dynamicSize / 2, this.y - dynamicSize / 2, dynamicSize, dynamicSize);
    let w = dynamicSize / 2;
    let h = dynamicSize / 2;
    switch (this.type) {
      case 'synth':
        {
          let quality = 6;
          canvasCtx.beginPath();
          for (let i = 0; i < quality; i++) {
            let index = i / quality * Math.PI * 2;
            let xx = this.x + Math.cos(index + this.life / 5) * w;
            let yy = this.y + Math.sin(index + this.life / 5) * w;
            canvasCtx.lineTo(xx, yy);
          }
          canvasCtx.fill();
          break;
        }
      case 'kick':
        {
          canvasCtx.beginPath();
          canvasCtx.moveTo(this.x + w, this.y + h);
          canvasCtx.lineTo(this.x - w, this.y + h);
          canvasCtx.lineTo(this.x - w, this.y - h);
          canvasCtx.lineTo(this.x + w, this.y - h);
          canvasCtx.fill();
          break;
        }
      case 'snare':
      {
        let quality = 6;
        canvasCtx.beginPath();
        console.log(this.life);
        for (let i = 0; i < quality; i++) {
          let index = i / quality * Math.PI * 2;
          let xx = this.x + Math.cos(index + this.life / 5) * ran(w);
          let yy = this.y + Math.sin(index + this.life / 5) * ran(w);
          canvasCtx.lineTo(xx, yy);
        }
        canvasCtx.fill();

        break;
      }

      case 'hihat':
      {
        canvasCtx.beginPath();
        canvasCtx.moveTo(this.x + w, this.y + h);
        canvasCtx.lineTo(this.x - w, this.y + h);
        canvasCtx.lineTo(this.x, this.y - h);
        canvasCtx.fill();
        break;
      }

    }

    this.life++;
  }
}
