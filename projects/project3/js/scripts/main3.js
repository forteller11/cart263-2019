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
let fps = 16;

let ctx;
let mesh;
let cameraOrigin;

function main() {
  let m1 = [
    [5,6,3,1],
    [-2,3,3,3],
    [10,1,10,2],
    [1,1,-10,-2]
  ]
  let v1 = [5,6,-1,1];

console.log(matVecMult(m1,v1))

//   let v1 = createVec(-1,3,-0);
//   let v2  = createVec(2,2,5);
//   let v3 = createVec(3,3,3);
// console.log(cross(v1,v2))

}
