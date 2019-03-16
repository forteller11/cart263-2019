'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;
let firstEntity;
let globalEntityIdCounter = 0; //everytime an entity is created it is given a unique identifier
let canvas;
let canvasCtx;
let debugMode = true;
let debugOpacity = 0.2;

function main() {
  if (debugMode) {
    console.log('main');
    console.log('main');
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = "#0000ff";
    canvasCtx.strokeStyle = "#0000ff";
    // canvasCtx.style.zIndex = 100;
    console.log(canvasCtx);
  }

  body = document.getElementById('body');
  globalObj = new Globals();
  console.log(globalObj);
  systemManager = new SystemManager();

  createEntitiesFromBlueprint('embedVideo', 4);

  let spacing = 64;
  let sinIndex = 0;
  for (let i = 0; i * spacing < window.innerWidth; i++){
    sinIndex = mapFromRanges(i*spacing,0,window.innerWidth,0,Math.PI);
    let floor = createEntitiesFromBlueprint('floor');
      floor.cPos.x = spacing*i;
        const curveAmount = floor.cHitbox.radius*6;
        const yyOrigin = window.innerHeight - curveAmount;
        const curve = Math.sin(sinIndex)*curveAmount/1.5;
      floor.cPos.y = yyOrigin+curve;
  }


  setInterval(update, 16.7);

}
