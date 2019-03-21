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
let beatNumber = 4*4 * 4;
let beats = []; //4*4 beats
let mouseDown = false;
for (let i = 0; i < beatNumber; i ++){ //create 2D array
  beats[i] = []; //will be arr of howler sound objs
}

function main(){
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
  if (mouseDown === true){ //if mouse is down
  console.log(beats);
  let newSynth = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: window.innerHeight-mouseY
    }
});
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
     // beats[beatIndex][i].pause();
  }
// console.log
  beatIndex++;
  if (beatIndex >= beatNumber) { beatIndex = 0}; //reset beat
  document.getElementById('beatCounter').innerHTML = `beat:${beatIndex}`;
  setTimeout(playSoundsOfBeat,beatLength);
}
