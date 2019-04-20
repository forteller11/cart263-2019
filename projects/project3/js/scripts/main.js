/*
project3: ludic sphere
Charly Yan Miller
Exploring shapes in 360*

preload: loads all .obj files, parses them;

main: sets up entity system component relationship, spawns meshes and players,
begins update loop

The way the ECS paradigm works is that every entity contains various components
which store data, this data is acted upon by appropriate systems
for this project the main focus was rendering, and therefore most of the time was
spent of the rendering system and the mesh component which is used by the rendering system
*/

'use strict';
window.onload = preload;

//text files to be loaded
let request = [];
let meshFileDirectory = ['1','2','3','4','5','8']; //array of all files to load in index/assets/_____.obj
let meshFileParsedData = []; //where to store the parsed blobs from each .obj file
let requestComplete = 0; //how many files have currently been completed/parsed

function preload(){ //loads all files before main funciton
for (let i = 0; i < meshFileDirectory.length; i ++){ //for every file listed in meshFileDirectory...
  request[i] = new XMLHttpRequest(); //request the data
  request[i].open('GET', 'assets/'+meshFileDirectory[i]+'.obj'); //open/setup request
  request[i].send();

  request[i].onload = () => { //on receiving the file
    meshFileParsedData[i] = convertObjFileToMeshBlob(request[i].response); //parse it to isolate all arrays and faces and put that info in blob
    requestComplete++; //keep track of how many requests have been competed
    if (requestComplete === meshFileDirectory.length){ //if all requests have finished, start main
      main();
    }
  }
}
}

let g; //global object
let systemManager; //manages ticks and updates and relevant entities of systems (things which act on components/data)
let globalEntityIdCounter = 0; //everytime an entity is created it is given a unique identifier
let ctx; //canvas context
let debugMode = false;
let debugOpacity = 0.2;
let fps = 16.7;
let bgColor; //color of yellow UI element

function main() {
  console.log('main');
  g = new Globals(); //instatiates object which encaspulates globals in game (encapuslates 'singleton' components)
  systemManager = new SystemManager(); //instantiate object responsble for updating systems

    //create canvas
  ctx = createCanvas(window.innerWidth, window.innerHeight);
  bgColor = [255, 192, 40, 1];

  createEntitiesFromBlueprint('player');

  createEntitiesFromBlueprint('mesh', 50);

  update();
  setInterval(update, fps); //begin update loop in which all systems update / act on all their relevant entities

}
