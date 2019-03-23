/*
resources;
https://thebookofshaders.com
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2
https://www.youtube.com/watch?v=kB0ZVUrI4Aw&t=997s
*/

'use strict';

let vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec3 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;',
  'uniform mat4 mWorld;',
  'uniform mat4 mView;',
  'uniform mat4 mProj;',
  '',
  'void main()',
  '{',
  'fragColor = vertColor;',
  'gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
  '}'
].join('\n');

let fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  'void main()',
  '{',
  'gl_FragColor = vec4(fragColor, 1.0);',
  '}'
].join('\n');

window.onload = main;

function main() {
  let canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  let gl = canvas.getContext('webgl');
  console.log(gl)

  gl.clearColor(.5, 1, .5, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compile', gl.getShaderInfoLog(vertexShader));
    return;
  }
  gl.compileShader(fragmentShader);

  //attach
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('error linking', gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    onsole.error('error linking', gl.getProgramInfoLog(program));
    return;
  }

//array on cpu
  let triangleVertices =
  [//x      y   z      R G B
    0.0,  0.5,  1.0,   0.0, 0.0, 1.0,
   -0.5, -0.5,  0.0,   1.0,  0.0, 1.0,
    0.5, -0.5,  0.0,   0.0, 1.0, 0.0,
  ];
  //transfer array to gpu
  let triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject); //bind buffer to new buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW); //static = not changing buffer

  let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  let colorAttribLocation    = gl.getAttribLocation(program, 'vertColor');
  gl.vertexAttribPointer(
      positionAttribLocation, //attribute location
      3, //number of elements per attribute
      gl.FLOAT, //type of elements
      gl.FALSE,
      5*Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
      0 //offset from the beginning of a single vertex to this attribute

  );

  gl.vertexAttribPointer(
      colorAttribLocation, //attribute location
      3, //number of elements per attribute
      gl.FLOAT, //type of elements
      gl.FALSE,
      5*Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
      3*Float32Array.BYTES_PER_ELEMENT //offset from the beginning of a single vertex to this attribute

  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.useProgram(program);

  var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
  var matWorldUniformLocation = gl.getUniformLocation(program, 'mView');
  var matWorldUniformLocation = gl.getUniformLocation(program, 'mProj');

  let worldMatrix = new Float32Array(16);
  let viewMatrix = new Float32Array(16);
  let projMatrix = new Float32Array(16);

  glMatrix.mat4.identity(worldMatrix);
  glMatrix.mat4.identity(viewMatrix);
  glMatrix.mat4.identity(projMatrix);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, projMatrix);

  gl.useProgram(program);
  //DRAW WHAT, how many verts to skip, how many verts to draw
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  //render loop
}
