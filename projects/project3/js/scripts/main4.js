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



function main() {
  console.log('main');
let mat = [
  [1,0,0],
  [0,1,0],
  [0,0,1]
];

let mat2 = [
  [1,0,0],
  [3,11,0],
  [0,0,1]
];


 let vec = [1,1,4];
 let vec2 = [1,1]
  console.log(matVecMult(mat,vec));

  console.log(mat);
  console.log(mat2);
  console.log(matMatMult(mat,mat2));


}
