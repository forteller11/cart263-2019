"use strict";

window.onload = main;

let videoSize = 100;
let frameWidth = window.innerWidth * .7;
let frameHeight = frameWidth * 9 / 16;
let centerXOffset = (window.innerWidth - frameWidth) / 2;
let centerYOffset = (window.innerHeight - frameHeight) / 2;
window.addEventListener('resize', () => {
   frameWidth = window.innerWidth * .7;
   frameHeight = frameWidth * 9 / 16;
   centerXOffset = (window.innerWidth - frameWidth) / 2;
   centerYOffset = (window.innerHeight - frameHeight) / 2;
});
let zoomToHorz = .57; //zoom into horz center of screen = .5
let zoomToVert = .43; // 0 = top, .5, center, 1 bottom
let x = 0;
let y = 0;
let video;
let container;

let zoomTarget = 1;
let zoomCurrent = 1;
const zoomChangePerFrame = .1;
const zoomIncreaseAmount = .25;

let leftKeysHeld = 0;
let rightKeysHeld = 0;

let fadeTimer = 0;
let fadeTime = 60 * 50;
let fadeSpeed = .004;
let videoOpacity = 1;

function main() {
  video = document.getElementById('video');
  video.style.position = "absolute";
  video.style.opacity = videoOpacity + "%";
  container = document.getElementById('container');
  container.style.position = "fixed";
  container.style.width = frameWidth + "px";
  container.style.height = frameHeight + 'px';
  // frameWidth = video.width;
  // frameHeight = video.height;

  document.addEventListener('keydown', (e) => {
    calculateZoomAmount(e, 1);
  });
  document.addEventListener('keyup', (e) => {
    calculateZoomAmount(e, -1);
  });

  console.log(video);

  setInterval(update, 16.7);
}

function update() {
  if ((leftKeysHeld > 0) && (rightKeysHeld > 0)) { //start video if both hands on at least one key
    video.play();
    fadeTimer++;
  } else {
    video.pause();
  }

  //animate smoothly between zoom levels
  const desiredZoomChange = zoomTarget - zoomCurrent;
  const zoomChange = desiredZoomChange * zoomChangePerFrame;
  zoomCurrent += zoomChange;

  // console.log("udpate");a
  container.style.left = centerXOffset + 'px';
  container.style.top = centerYOffset + 'px';

  video.width = frameWidth * zoomCurrent;
  video.height = frameHeight * zoomCurrent;
  video.style.left = -(zoomCurrent - 1) * frameWidth * zoomToHorz + 'px';
  video.style.top = -(zoomCurrent - 1) * frameHeight * zoomToVert + 'px';

  if (fadeTimer > fadeTime) {
    videoOpacity -= fadeSpeed;
    video.style.opacity = videoOpacity;
    video.volume = videoOpacity;
    // video.style.filter = 'alpha(opacity='+Math.round(videoOpacity*100)+')';
  }

}


function calculateZoomAmount(e, sign) {
  video.play();
  if (e.repeat === false) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 65: //a
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;

      case 97: //a
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;

      case 83: //s
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;


      case 68: //d
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;

      case 70: //f
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;
      case 71: //g
        zoomTarget += zoomIncreaseAmount * sign;
        leftKeysHeld += 1 * sign;
        break;

      case 72: //h
        zoomTarget += zoomIncreaseAmount * sign;
        rightKeysHeld += 1 * sign;
        break;
      case 74: //j
        zoomTarget += zoomIncreaseAmount * sign;
        rightKeysHeld += 1 * sign;
        break;

      case 75: //k
        zoomTarget += zoomIncreaseAmount * sign;
        rightKeysHeld += 1 * sign;
        break;

      case 76: //L
        zoomTarget += zoomIncreaseAmount * sign;
        rightKeysHeld += 1 * sign;
        break;

      default:
        break;
    }
  }
}
