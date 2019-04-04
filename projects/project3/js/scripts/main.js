/*
assignment8: graphics programming
Charly Yan Miller
In which i've spent a long time getting your screen to look like it's a window
into a world of rotating triangles
*/

'use strict';
window.onload = main;

let g; //global object
let systemManager;
let globalEntityIdCounter = 0; //everytime an entity is created it is given a unique identifier
let ctx;
let debugMode = true;
let debugOpacity = 0.2;

function main() {
  g = new Globals(); //instatiates object which encaspulates globals in game (encapuslates 'singleton' components)
  systemManager = new SystemManager(); //instantiate object responsble for updating systems

  //create canvas
  ctx = createCanvas(window.innerWidth, window.innerHeight);
  ctx.fillStyle = cssRGB(ran(255), ran(255), ran(255));
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  let request = new XMLHttpRequest();
  request.open('GET', 'assets/triangle02.obj'); //open/setup request
  request.send();

  request.onload = () => {
    mesh = new Mesh(convertObjFileToMeshBlob(request.response));
    update();
    setInterval(update, fps);
  }

}
