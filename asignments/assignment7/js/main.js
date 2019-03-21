// 'use strict';
//
//
// window.onload = main;
// function main(){
//   let innerArr = ['tinybreak','tinydeath','tinylov']
//   let outerArr = ['break','death','lov',innerArr];
//   console.log(outerArr);
//   let arr = outerArr[3][2];
//   console.log(arr);
// }
//
"use strict";

//can only create sounds on beat, every beat has multiple sounds,
//can create sounds with mouse, pitch with mouseY, volume with mouseX
window.onload = main;
let frequencies =
 [21.83,
  27.50,
  30.87,
  32.70,
  20.60,
  43.65];

let mouseX = 0;
let mouseY = 0;

let hihat;
let kick;
let snare;
let synth;

let beatIndex = 0;
let beatLength = 300/4;
let beatNumber = 2*4 * 4;
let beats = []; //4*4 beats
let mouseDown = false;
let canvas;
let canvasCtx;
for (let i = 0; i < beatNumber; i ++){ //create 2D array
  beats[i] = []; //will be arr of howler sound objs
}

function main(){

  console.log('main');
  console.log('main');
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  canvasCtx = canvas.getContext('2d');
  // canvasCtx.style.zIndex = 100;
  console.log(canvasCtx);

console.log(beats)
  hihat = new Pizzicato.Sound('assets/hihat.wav');

  kick  = new Pizzicato.Sound('assets/kick.wav');

  snare = new Pizzicato.Sound('assets/snare.wav');


  document.addEventListener('mousemove',(e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('mousedown',(e)=>{
    mouseDown = true;
});
  document.addEventListener('mouseup',(e)=>{
    mouseDown = false;
  });

setTimeout((playSoundsOfBeat),beatLength);
  console.log('main');


}
function playSoundsOfBeat(){
  let canvasColor = 0;
  canvasCtx.fillStyle =`rgba(${canvasColor},${canvasColor},${canvasColor},${.2})`;
  canvasCtx.fillRect(0,  0, window.innerWidth, window.innerHeight);

  if (mouseDown === true){ //if mouse is down
  console.log(beats);
  let newSynth = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: window.innerHeight-mouseY
    }
});
newSynth.x = mouseX;
newSynth.y = mouseY;
newSynth.volume = mapFromRanges(mouseX,0,window.innerWidth,0,1);
  beats[beatIndex].push(newSynth);
}

  let previousBeatIndex = beatIndex-1;
  if (beatIndex === 0){ previousBeatIndex = beats.length-1}
  for (let i = 0; i < beats[previousBeatIndex].length; i ++) {
     // beats[previousBeatIndex][i].volume = 0;
     beats[previousBeatIndex][i].pause();
     console.log(`stopped beat ${beats[previousBeatIndex][i]}`)
  }
// console.log(`previousBeat:${previousBeat} currentBeat:${beatIndex}`);
  for (let i = 0; i < beats[beatIndex].length; i ++) {
     beats[beatIndex][i].play();
     let minSize = 2;
     let maxSize = 100;
     console.log(beats[beatIndex][i].volume);
     let size = beats[beatIndex][i].volume*maxSize;
       canvasCtx.fillStyle=`rgb(${ran(255)},${ran(255)},${ran(255)})`;
       canvasCtx.fillRect( beats[beatIndex][i].x-size/2,  beats[beatIndex][i].y-size/2, size, size);
     // beats[beatIndex][i].pause();
  }
// console.log
  beatIndex++;
  if (beatIndex >= beatNumber) { beatIndex = 0}; //reset beat
  document.getElementById('beatCounter').innerHTML = `beat:${beatIndex}`;
  setTimeout(playSoundsOfBeat,beatLength);

}
