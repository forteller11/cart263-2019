/*
resources;
https://thebookofshaders.com
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2
https://www.youtube.com/watch?v=kB0ZVUrI4Aw&t=997s

texture mapping
https://observablehq.com/@shaunlebron/texture-drawing-for-html-canvas
*/

'use strict';
window.onload = main;
let debugMode = true;

let ctx;
let mesh;
let vector;

function main() {

  //create canvas
ctx = createCanvas(window.innerWidth,window.innerHeight);
ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  dLog('main');
  let request = new XMLHttpRequest();
  request.open('GET', 'assets/triangle.obj'); //open/setup request
  request.send();

  request.onload = () => {
    console.log(convertObjFileToMeshBlob(request.response));
    let dog = new Mesh(convertObjFileToMeshBlob(request.response));
    console.log (dog);
    mesh = new Mesh(convertObjFileToMeshBlob(request.response));

    setInterval(update,100);


  }

}
