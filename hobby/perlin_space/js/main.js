"use strict";
const noiseIndexXSeed = 100213;
const noiseIndexYSeed = 8132;
const charSize = 18;
let player;
function setup() {
  player = new Player();
  noiseSeed(0);
  // modcharsize
  noiseDetail(8);
  createCanvas(500, 500);
  textSize(charSize);
}

function draw() {
  player.update;
  background(255);
  let noiseIndexX = noiseIndexXSeed + mouseX / width; //+ player.x
  let noiseIndexY = noiseIndexYSeed + mouseY / height;
  noStroke();

  for (let i = 0; i < width / charSize; i++) {
    for (let j = 0; j < height / charSize; j++) {
      const x = i * charSize;
      const y = j * charSize;

      const yy = noise(i / charSize + noiseIndexX, j / charSize + noiseIndexY);
      // fill(255*yy);
      fill(0);
      if ((yy > .3) && (yy < .38)) {
        text(".", x, y);
      }
      if ((yy > .38) && (yy < .45)) {
        text(",,", x, y);
      }
      if ((yy > .45) && (yy < .55)) {
        text("o", x, y);
      }
      if ((yy > .55) && (yy < .65)) {
        text("O", x, y);
      }
      if ((yy > .65) && (yy < .75)) {
        text("m", x, y);
      }
      if ((yy > .75) && (yy < 1)) {
        text("lll", x, y);
      }
      // ellipse(i*charSize,j*charSize,charSize);
    }
  }
}
