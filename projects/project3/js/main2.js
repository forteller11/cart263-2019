'use strict';

let vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  'void main()',
  '{',
  'gl_Position = vec4(vertPosition,0.0, 1.0);',
  '}'
].join('\n');

let fragmentShaderText = [
  'precision mediump float;',
  '',
  'void main()',
  '{',
  'gl_FragColor = vec4(1.0, 0.0 , 0.0, 1.0);',
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
  [
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ];
  //transfer array to gpu
  let triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject); //bind buffer to new buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW); //static = not changing buffer

  let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(
      positionAttribLocation, //attribute location
      2, //number of elements per attribute
      gl.FLOAT, //type of elements
      gl.FALSE,
      2*Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
      0 //offset from the beginning of a single vertex to this attribute

  );

  gl.enableVertexAttribArray(positionAttribLocation);

  gl.useProgram(program);
  //DRAW WHAT, how many verts to skip, how many verts to draw
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  //render loop
}
