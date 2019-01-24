"use strict";
const noiseIndexXSeed = 100213;
const noiseIndexYSeed = 8132;
const charSize = 18;
let textbox;
function setup() {
  textbox = document.getElementById("textbox");
  noiseSeed(0);
  // modcharsize
  noiseDetail(8);
  createCanvas(windowWidth, windowHeight);
  textSize(charSize);
}

function draw() {
  textbox.value = "I am a textbox";
  textbox.style.left = mouseX + "px";
  textbox.style.top = mouseY + "px";
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
      if ((yy > .2) && (yy < .3)) {
        text(".", x, y);
      }
      if ((yy > .3) && (yy < .45)) {
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
