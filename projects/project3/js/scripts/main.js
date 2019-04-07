/*
assignment8: graphics programming
Charly Yan Miller
In which i've spent a long time getting your screen to look like it's a window
into a world of rotating triangles
*/

'use strict';
window.onload = preload;

//text files to be loaded
let request = [];
let meshFileDirectory = ['0','1','2','3'];
let meshFileParsedData = []; //to be loaded
let requestComplete = 0;

function preload(){ //loads all files before main funciton
for (let i = 0; i < meshFileDirectory.length; i ++){
  request[i] = new XMLHttpRequest();
  request[i].open('GET', 'assets/'+meshFileDirectory[i]+'.obj'); //open/setup request
  request[i].send();

  request[i].onload = () => {
    meshFileParsedData[i] = convertObjFileToMeshBlob(request[i].response);
    requestComplete++;
    if (requestComplete === meshFileDirectory.length){ //if all requests have finished, start main
      main();
    }
  }
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
  console.log('main');
  g = new Globals(); //instatiates object which encaspulates globals in game (encapuslates 'singleton' components)
  systemManager = new SystemManager(); //instantiate object responsble for updating systems

  bgColor = [ran(200,255), ran(200,255), ran(50), 0.7];
  //create canvas
  ctx = createCanvas(window.innerWidth, window.innerHeight);

  createEntitiesFromBlueprint('player');
  let ent = createEntitiesFromBlueprint('mesh', 4);

  update();
  setInterval(update, fps);



}
