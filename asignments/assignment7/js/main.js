"use strict";

//can only create sounds on beat, every beat has multiple sounds,
//can create sounds with mouse, pitch with mouseY, volume with mouseX
window.onload = main;
let frequencies = [
  21.83, 27.50, 30.87, 32.70, 20.60, 43.65];

let mouseX = 0;
let mouseY = 0;

let hihat;
let kick;
let snare;
let synth;

let beatIndex = 0;
let beatLength = 300;
let beats = []; //4*3 beats
let soundQueue = [];

function main(){
for (beat of beats){
  beat = []; //arr of howler sound objs
}
  hihat = new Pizzicato.Sound('assets/hihat.wav');

  kick  = new Pizzicato.Sound('assets/kick.wav');

  snare = new Pizzicato.Sound('assets/snare.wav');


  document.addEventListener('mousemove',(e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    console.log(e.clientX);
  });

  document.addEventListener('mousedown',(e)=>{
    beats[beatIndex].push(newSynth);
  });

setTimeout((playSoundsOfBeat),beatLength);
  console.log('main');

  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 0
    }
});
}
function playSoundsOfBeat(){
  //stop all previoussounds
  let previousBeat = beatIndex-1;
  if (beatIndex === 0){ previousBeat = beats.length}
  for (let i = 0; i < previousBeat.length; i ++) {
     beats[beatIndex][i].stop();
  }

  for (let i = 0; i < beats[beatIndex].length; i ++) {
     beats[beatIndex][i].play();
  }
  beatIndex++;
  setTimeout(playSoundsOfBeat,beatLength);
}
