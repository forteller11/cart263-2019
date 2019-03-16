/*
project 2: youtube tinder
Charly Yan Miller
in which random (random from a pre-determined array of id's) containing youtube videos
fall from the sky and the user can swipe left or right to respectively close or open the video.

In terms of programmatic skill demonstrated the physics system (including collision resolutions)
were written by me.
Also I started trying to make a sort of game engine with the
entity component system paradigm in mind, in short instead incapuslating ideas and data
into massive objects you instantiate entities which you attach components or properties to.
These components have no methods (simply data/properties) and then systems work and manipulate
these components. This seperation between data and things which act on data is useful
in part because it reduces the artificial duplication of data which object oriented
apporahces tend to encourage and the more reliable relationship between and placement
of systems and data in theory helps scalability. This being said I for an ECS system
to really make sense from a performance standpoint you need hashtables but they are
definitely beyond me at this point (also obviously im in above my head).




*/

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
  if (debugMode) { //instantiate canvas to draw debug info if debugMode is on
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

  globalObj = new Globals(); //instatiates object which encaspulates globals in game (encapuslates 'singleton' components)
  systemManager = new SystemManager(); //instantiate object responsble for updating systems

  createEntitiesFromBlueprint('embedVideo', 4); //spawn 4 youtube spheres at start of game

  //spawn sphere with instructions "Swipe Right to Open" at right of screen.
  let swipeRightInstructions = createEntitiesFromBlueprint('instructions');
  swipeRightInstructions.cHtmlDisplay.image.src = "assets/swipeRight.png";
  swipeRightInstructions.cPos.x = window.innerWidth-swipeRightInstructions.cHitbox.radius;

  //spawn sphere with instructions "Swipe left to close" at left of screen.
  let swipeLeftInstructions = createEntitiesFromBlueprint('instructions');
  swipeLeftInstructions.cHtmlDisplay.image.src = "assets/swipeLeft.png";
  swipeLeftInstructions.cPos.x = swipeLeftInstructions.cHitbox.radius;

  //spawn static spheres with the youtube logo to act as a catcher for the Embed Videos
  //make the youtube logo slope towards the center of the screen
  let spacing = window.innerWidth/12;
  let sinIndex = 0;
  for (let i = 1; i * spacing < window.innerWidth; i++){
    sinIndex = mapFromRanges(i*spacing,0,window.innerWidth,0,Math.PI);
    let floor = createEntitiesFromBlueprint('floor');
      floor.cPos.x = spacing*i;
        const curveAmount = floor.cHitbox.radius*6;
        const yyOrigin = window.innerHeight - curveAmount;
        const curve = Math.sin(sinIndex)*curveAmount/1.5;
      floor.cPos.y = yyOrigin+curve;
  }

if (debugMode){
  console.log(globalObj);
  console.log(systemManager);
}

  setInterval(update, 16.7);

}
