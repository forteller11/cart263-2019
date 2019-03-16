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


  // let swipeLeftChecker = createEntitiesFromBlueprint('playfield');
  // swipeLeftChecker.cPos.x = -200;
  // swipeLeftChecker.cPos.y = window.innerHeight/2;
  // swipeLeftChecker.cHitbox.doOnOverlap = removeEntity;
  //
  // let swipeRightChecker = createEntitiesFromBlueprint('playfield');
  // swipeRightChecker.cPos.x = window.innerWidth + swipeRightChecker.cHitbox.width;
  // swipeRightChecker.cPos.y = window.innerHeight / 2;
  // swipeRightChecker.cHitbox.doOnOverlap = openVideo;

  // let offBottomChecker = createEntitiesFromBlueprint('playfield');
  // offBottomChecker.cHitbox.width = window.innerWidth*2;
  // offBottomChecker.cHitbox.height = -600;
  // offBottomChecker.cPos.x = window.innerWidth / 2;
  // offBottomChecker.cPos.y = window.innerHeight - offBottomChecker.cHitbox.height;
  // offBottomChecker.cHitbox.doOnOverlap = removeEntity;

  // createEntitiesFromBlueprint('playfield').cHitbox.doOnOverlap = someFunction;

  // createEntitiesFromBlueprint(headBlueprint,3);

  // let xx = 0;
  // while (xx < window.innerWidth){
  //   createEntitiesFromBlueprint(floorBlueprint,1,(e)=>{
  //     e.cPos.x = xx;
  //     xx+=e.cHitbox.radius*3;
  //       e.cPos.y = window.innerHeight/1.1 - e.cHitbox.radius;
  //   });
  // }


  setInterval(update, 16.7);

}

function openVideo(other) {
  if (other.blueprintName === 'embedVideo') {
    if (other.cPos)
    console.log('OPEN VIDEO');
    console.log(systemManager.systems);
    const xx = ran(window.innerWidth);
    const yy = ran(window.innerHeight);
    const rr = other.cHitbox.radius * 3;
    // const r
    window.open(`https://www.youtube.com/watch?v=${other.cHtmlDisplay.link}`, '_blank', `toolbar=no,scrollbars=no,resizable=no,top=${yy},left=${xx},width=${rr},height=${rr}`);
    // window.focus();
    systemManager.removeEntity(other);
  }

}

function removeEntity(other) {
  if (other.blueprintName === 'embedVideo') {
    systemManager.removeEntity(other);
    if (debugMode) console.log('entity deleted!');
  }
}
