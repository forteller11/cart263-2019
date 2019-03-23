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
//each mesh contains an array of vtData
let meshes = [

]
//vtData base units of info are
//three vectors, vertex normal, color of that triangle
//[x,y,z]*3;     [x,y,z];       rgba

//xyz
let verts = [
]
//v1,v2,v3;vertexNormal(xyz);rgba
let faces = [

]

function main() {
dLog('main');
  let request = new XMLHttpRequest();
  request.open('GET','assets/cube3.obj'); //open/setup request
  request.send();

  request.onload = () => {
    convertObjToVtData(request.response);
  // dLog(request.response);
}
}

//parses obj and converts to file format
function convertObjToVtData(obj){
  console.log(obj);
  let vArr = []; //vertices
  let vnArr = []; //vertexNormals
let currentData = 'unknown';
  for (let i = 0; i < obj.length; i ++){
    if (obj[i] === 'v'){
      if (obj[i+1] === 'n'){currentData = 'vertexNormal'}
      else {currentData = 'vertex'}
    }
    else if (obj[i] === 'f'){ currentData = 'face'}
    //if
    else if (!(currentData === 'unknown')){

      switch(currentData){
        case 'vertex':
        break;

        case 'vertexNormal':
        break;

        case 'vertexFace':
        break;
      }
    }

  }

}
