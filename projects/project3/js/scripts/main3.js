/*
resources;
https://thebookofshaders.com
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2
https://www.youtube.com/watch?v=kB0ZVUrI4Aw&t=997s
texture mapping
https://observablehq.com/@shaunlebron/texture-drawing-for-html-canvas
linear algebra help
https://www.youtube.com/watch?v=27vT-NWuw0M (Introduction to projections - khan academy)
*/

'use strict';
window.onload = main;
let debugMode = true;
let fps = 1000;

let ctx;
let mesh;
let cameraOrigin;

function main() {
    dLog('main');
  cameraOrigin = [0, 0, 0];
  //create canvas
  ctx = createCanvas(window.innerWidth, window.innerHeight);
  ctx.fillStyle = cssRGB(ran(255), ran(255), ran(255));
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  let request = new XMLHttpRequest();
  request.open('GET', 'assets/triangle.obj'); //open/setup request
  request.send();

  request.onload = () => {
    mesh = new Mesh(convertObjFileToMeshBlob(request.response));
    // mesh.vertComponent(3,3,'z');
    update();
    setInterval(update, fps);
  }

}
