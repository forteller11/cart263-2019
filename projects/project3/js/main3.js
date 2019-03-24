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
  let currentWord = ''; //string of current num
let currentData = 'unknown';
  for (let i = 0; i < obj.length; i ++){
    // console.log(i);
    if (Number(obj[i]) === undefined){currentData = 'unknown';} //if not a number then set unknown until find out its vertex,vertnormal or face
    if ((obj[i] === 'v')&&(obj[i+1]===' ')) {
      currentData = 'vertex';
      console.log('VERTEX')
      i+=2;
    }
    if ((obj[i] === 'v')&&(obj[i+1]==='n')){
      currentData = 'vertexNormal';
      i+=3;
    }
    if ((obj[i] === 'f')&&(obj[i+1]===' ')) {
      currentData = 'face';
      i+=2;
  }

    //if


      switch(currentData){
        case 'unknown':
        //move on
        break;

        case 'vertex':
          if (obj[i] === ' '){ //if at end of vertex, push current word, empty it
            console.log(currentWord);
            vArr.push(Number(currentWord));
            currentWord = '';
            break;
          }
            currentWord+=obj[i]; //  add number (in string form, to current wrod)



          break;

        case 'vertexNormal':
          break;

        case 'vertexFace':
          break;
      }
  }
  dLog(vArr);
}
