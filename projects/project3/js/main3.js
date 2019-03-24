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
function main() {
  //create canvas
ctx = createCanvas(window.innerWidth,window.innerHeight);
ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  dLog('main');
  let request = new XMLHttpRequest();
  request.open('GET', 'assets/triangle.obj'); //open/setup request
  request.send();

let mesh;
  request.onload = () => {
    mesh = convertObjFileToMeshBlob(request.response);

    for (let i = 0; i < mesh.faces.length; i ++){
      console.log('FACE '+i);
      ctx.beginPath();
      ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
      ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
      for (let j = 0; j < mesh.faces[i].length; j++){
        let vecX = mesh.verts[mesh.faces[i][j]+0];
        let vecY = mesh.verts[mesh.faces[i][j]+1];
        let vecZ = mesh.verts[mesh.faces[i][j]+2];
        console.log(`
      vertIndex: ${mesh.faces[i][j]}
      Components:${vecX},${vecY},${vecZ}`)
          ctx.lineTo((vecX+.5)*window.innerWidth/2, (vecY+.5)*window.innerHeight/2); //x,y of vec Index
      }
      console.log('fill');
      ctx.stroke();
    }

  }


}
