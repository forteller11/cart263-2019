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
let verts = []
//v1,v2,v3;vertexNormal(xyz);rgba
let faces = [

]

function main() {
  dLog('main');
  let request = new XMLHttpRequest();
  request.open('GET', 'assets/triangle.obj'); //open/setup request
  request.send();

  request.onload = () => {
    convertObjToVtData(request.response);
    // dLog(request.response);
  }
}

//parses obj and converts to file format
function convertObjToVtData(obj) {
  console.log(obj);
  let vArr = []; //vertices
  let vnArr = []; //vertexNormals
  let fArr = []; //face
  let currentWord = ''; //string of current num
  let currentDataType = 'irrelevant';
  for (let i = 0; i < obj.length; i++) {
    // console.log(obj[i]);
    if ((obj[i] === ' ') || (obj[i] === '\n')) { //if at end of word, push data to relevant data type if currentDataType is a keyword
      if (!(Number(currentWord) === undefined)){ //if string is numeric, then push it to approrpaite array depending of currentDataType
        if (currentDataType === 'irrelevant')  {}
        if (currentDataType === 'vertex')      {vArr.push(Number(currentWord))}
        if (currentDataType === 'vertexNormal'){vnArr.push(Number(currentWord))}
        if (currentDataType === 'vertexFace')  {fArr.push(Number(currentWord))}
    } else { //if string is not numeric, then it is irrelvant until proven otherwise
      currentDataType = 'irrelevant';
    }
    /*//if at end of word and not current parsing a relevant datatype (v,vn,f)
     then see if word indicates that this is a relevant datatype, otherwise it remains irrelevant*/
    if (currentWord === 'v'){currentDataType = 'vertex'; console.log('VERTEX')}
    if (currentWord === 'vn'){currentDataType = 'vertexNormal'}
    if (currentWord === 'f'){currentDataType = 'face'}

    currentWord = ''; //reset current word

  } else { //if not a space
    currentWord += obj[i]; //add current parsed character to currentWord
  }
}
dLog(vArr);
}
