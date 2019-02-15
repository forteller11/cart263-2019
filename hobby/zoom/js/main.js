"use strict";

window.onload = main;

let videoSize = 100;
let frameWidth = videoSize*16;
let frameHeight = videoSize*9;
let zoomToHorz = .5; //zoom into horz center of screen = .5
let zoomToVert = .5; // 0 = top, .5, center, 1 bottom
let centerXOffset = (window.innerWidth - frameWidth)/2;
let centerYOffset = (window.innerHeight - frameHeight)/2;
let x = 0;
let y = 0;
let video;
let container;

let zoomAmount = 1;
const zoomIncreaseAmount = .25;

function main() {
  video = document.getElementById('video');
  video.style.position = "absolute";

  container = document.getElementById('container');
  container.style.position = "absolute";
  container.style.width = frameWidth+"px";
  container.style.height = frameHeight + 'px';
  // frameWidth = video.width;
  // frameHeight = video.height;

  document.addEventListener('keydown', (e) => {
    calculateZoomAmount(e,1);
  });
  document.addEventListener('keyup', (e) => {
    calculateZoomAmount(e,-1);
  });

  console.log(video);

  setInterval(update,16.7);
}

function update() {
  // console.log("udpate");a
  container.style.left = centerXOffset + 'px';
  container.style.top = centerYOffset + 'px';

  video.width = frameWidth*zoomAmount;
  video.height = frameHeight*zoomAmount;
  video.style.left = -(zoomAmount-1)*frameWidth*zoomToHorz  + 'px';
  video.style.top = -(zoomAmount-1)*frameHeight*zoomToVert  + 'px';
}


function calculateZoomAmount(e,sign) {
  video.play();
  if (e.repeat === false){
  console.log(e.keyCode );
  switch (e.keyCode) {
    case 65: //a
      zoomAmount += zoomIncreaseAmount*sign;
      break;

      case 97: //a
        zoomAmount += zoomIncreaseAmount*sign;
        break;

    case 83: //s
      zoomAmount += zoomIncreaseAmount*sign;
      break;

      case 115: //s
        zoomAmount += zoomIncreaseAmount*sign;
        break;

    case 68: //d
      zoomAmount += zoomIncreaseAmount*sign;
      break;

      case 100: //d
        zoomAmount += zoomIncreaseAmount*sign;
        break;

    case 74: //j
      zoomAmount += zoomIncreaseAmount*sign;
      break;



    case 75: //k
      zoomAmount += zoomIncreaseAmount*sign;
      break;



    case 76: //L
      zoomAmount += zoomIncreaseAmount*sign;
      break;



    default:
      break;
  }
}
}
