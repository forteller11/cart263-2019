/*
assignment8: graphics programming
Charly Yan Miller
In which i've spent a long time getting your screen to look like it's a window
into a world of rotating triangles
*/

'use strict';
window.onload = preload;

//text files to be loaded
let meshFileDirectory = 'assets/triangle02.obj';
let meshFileParsedData; //to be loaded

function preload(){ //loads all files before main funciton

  let request = new XMLHttpRequest();
  request.open('GET', meshFileDirectory); //open/setup request
  request.send();

  request.onload = () => {
    meshFileParsedData = convertObjFileToMeshBlob(request.response);
    main();
  }
}

let g; //global object
let systemManager;
let globalEntityIdCounter = 0; //everytime an entity is created it is given a unique identifier
let ctx;
let debugMode = true;
let debugOpacity = 0.2;
let fps = 16.7;
let bgColor;

function main() {
  g = new Globals(); //instatiates object which encaspulates globals in game (encapuslates 'singleton' components)
  systemManager = new SystemManager(); //instantiate object responsble for updating systems

  bgColor = [ran(200,255), ran(200,255), ran(50), 0.7];
  //create canvas
  ctx = createCanvas(window.innerWidth, window.innerHeight);

  createEntitiesFromBlueprint('player');
  let ent = createEntitiesFromBlueprint('mesh',30);

  update();
  setInterval(update, fps);



}
