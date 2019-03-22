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

let mouseX = 0;
let mouseY = 0;

let maxSoundTypeOverlap = 8; //max overlap of per instrument type per beat
let hihats = []; //arr of highhats
let kicks  = []; //arr of kicks
let snares = []; //arr of snares
let synths = []; //are of synths
let graphics = [];
let beatIndex = 0;
let beatLength = 300 / 4;
let beatNumber = 2 * 4 * 4;
let beats = []; //4*4 beats
let mouseDown = false;
let oneDown = false;
let twoDown = false;
let threeDown = false;

let canvas;
let canvasCtx;
for (let i = 0; i < beatNumber; i++) { //create 2D array
  beats[i] = []; //will be arr of howler sound objs
}

function main() {
  //create instruments
  for (let i = 0; i < maxSoundTypeOverlap; i++) {
    synths.push(new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 440
    }
}));

          kicks.push(new Pizzicato.Sound('assets/kick.wav'));
          snares.push(new Pizzicato.Sound('assets/snare.wav'));
            hihats.push(new Pizzicato.Sound('assets/hihat.wav'));
        }

        //create canvas
        console.log('main');
        canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
         document.body.appendChild(canvas);
         canvasCtx = canvas.getContext('2d');
        // canvasCtx.style.zIndex = 100;
        console.log(canvasCtx);



        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        document.addEventListener('keydown', (e) => {
          console.log('KEYDOWN')
          switch (e.key) {
            case "1":
              oneDown = true;
              break;
            case "2":
              twoDown = true;
              break;
            case "3":
              threeDown = true;
              break;
          }
          console.log(`${oneDown}${twoDown}${threeDown}`);
        });

        document.addEventListener('keyup', (e) => {
          console.log('KEYUP')
          switch (e.key) {
            case "1":
              oneDown = false;
              break;
            case "2":
              twoDown = false;
              break;
            case "3":
              threeDown = false;
              break;
          }
          console.log(`${oneDown}${twoDown}${threeDown}`);
        });

        document.addEventListener('mousedown', (e) => {
          mouseDown = true;
        }); document.addEventListener('mouseup', (e) => {
          mouseDown = false;
        });

        setTimeout((playSoundsOfBeat), beatLength); console.log('main');


      }

      function playSoundsOfBeat() {
        // canvasCtx.fillStyle = `rgb(${ran(255)},${ran(255)},${ran(255)})`;
        // canvasCtx.fillRect(beats[beatIndex][i].x - size / 2, beats[beatIndex][i].y - size / 2, size, size);

        let canvasColor = 0;
        canvasCtx.fillStyle = `rgba(${canvasColor},${canvasColor},${canvasColor},${.2})`;
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);


      if (oneDown === true) {
        beats[beatIndex].push(createSoundBlob('kick'));
      }
      if (twoDown === true) {
        beats[beatIndex].push(createSoundBlob('hihat'));
      }
      if (threeDown === true) {
        beats[beatIndex].push(createSoundBlob('snare'));
      }
      if (mouseDown === true) {
        beats[beatIndex].push(createSoundBlob('synth'));
      }

      let previousBeatIndex = beatIndex - 1;
      if (beatIndex === 0) {
        previousBeatIndex = beats.length - 1
      }
      for (let i = 0; i < maxSoundTypeOverlap; i++) {
        synths[i].pause();
        kicks [i].pause();
        snares[i].pause();
        synths[i].pause();
      }

      // console.log(`previousBeat:${previousBeat} currentBeat:${beatIndex}`);
      for (let i = 0; i < beats[beatIndex].length; i++) {
        let frequency = window.innerHeight - beats[beatIndex][i].y + 80;
        let vol = 1-beats[beatIndex][i].y/window.innerHeight;
        console.log('VOL:'+vol);
        console.log(beats[beatIndex][i]);
        graphics.push(
          new Graphic(beats[beatIndex][i].type,
            beats[beatIndex][i].x,
            beats[beatIndex][i].y));
            console.log(graphics);

        switch (beats[beatIndex][i].type) {
          case 'synth':
            synths[i].frequency = frequency;
            synths[i].volume = 0.09;
            synths[i].play()
            // console.log(synths[i]);
            break;
          case 'kick':
            kicks[i].volume = vol;
            kicks[i].play()
            break;
          case 'snare':
            snares[i].volume = vol;
            snares[i].play()
            break;
          case 'hihat':
            hihats[i].volume = vol;
            hihats[i].play()
            break;

        }

        console.log(beats[beatIndex][i]);
        let size = beats[beatIndex][i].x * .05;//size
        // beats[beatIndex][i].pause();
      }
      // console.log
      beatIndex++;
      if (beatIndex >= beatNumber) {
        beatIndex = 0
      }; //reset beat
      document.getElementById('beatCounter').innerHTML = `beat:${beatIndex}`; setTimeout(playSoundsOfBeat, beatLength);

for (let i = 0; i < graphics.length; i ++){
  console.log(graphics[i]);
  graphics[i].update();
  if (graphics[i].life > graphics[i].lifeSpan){
    graphics.splice(i,1);
    console.log('SPLICED')
  }
}
    }

    function createSoundBlob(type, x = mouseX, y = mouseY) {
      return {
        type: type,
        x: x,
        y: y
      }
    }
