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
    dLog('main');
let v1 = [0,1,2];
let v2 = [1,1,1];
let v3 = [0,0,0];

console.log(meanVec(v1,v2,v3));

}
