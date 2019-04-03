function update(){
  //if position changes
  // console.log(mesh)
ctx.fillStyle = cssRGB(255,255,0);
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);



// console.log(mesh);
const scale = 100;
const xScale = scale;
const yScale = scale;
const zScale = scale;

const xOff = window.innerWidth/2;
const yOff = window.innerHeight/2;
const zOff = 0;

mesh.xAngle += .005;
mesh.yAngle -= .001;
mesh.zAngle -= .00001;

let scaleMat = [
  [xScale,0,0,0],
  [0,yScale,0,0],
  [0,0,zScale,0],
  [0,0,0,1]
]
let translationMat = [
  [1,0,0,xOff],
  [0,1,0,yOff],
  [0,0,1,zOff],
  [0,0,0,1]
]
let centerMat = [
  [1,0,0,window.innerWidth/2],
  [0,1,0,window.innerHeight/2],
  [0,0,1,-10],
  [0,0,0,1]
]
let uncenterMat = [
  [1,0,0,-window.innerWidth/2],
  [0,1,0,-window.innerHeight/2],
  [0,0,1,10],
  [0,0,0,1]
]
let positionMat = matMatComposition(scaleMat,translationMat);

let rSpd = 20;
let rotationMatXYZ = matMatComposition(rotationMat(Math.sin(mesh.xAngle)/rSpd, 'x'), rotationMat(Math.sin(mesh.yAngle)/rSpd, 'y'), rotationMat(Math.sin(mesh.zAngle)/rSpd, 'z'));

for (let i = 0; i < mesh.verts.length/3; i++){ //rotate all verts by rotation matrix
  let ii = i*3;
  let vert = [ mesh.verts[ii+0],  mesh.verts[ii+1],  mesh.verts[ii+2], 1 ]; //encapsulate verts ntuples intoa  single array

  let rotatedVec = matVecMult(rotationMatXYZ,vert); //multiply vertex by rotation matrix

  //store rotated vertex
  mesh.verts[ii+0] = rotatedVec[0];
  mesh.verts[ii+1] = rotatedVec[1];
  mesh.verts[ii+2] = rotatedVec[2];
}
mesh.sortFacesByDistanceToPoint(cameraOrigin);


for (let i = 0; i < mesh.faces.length/3; i ++){
  // console.log(mesh.vertsDistToCamera);
  let v1Raw = [mesh.vertData(i,0,'x'), mesh.vertData(i,0,'y'), mesh.vertData(i,0,'z'), 1];
  let v2Raw = [mesh.vertData(i,1,'x'), mesh.vertData(i,1,'y'), mesh.vertData(i,1,'z'), 1];
  let v3Raw = [mesh.vertData(i,2,'x'), mesh.vertData(i,2,'y'), mesh.vertData(i,2,'z'), 1];

  let d1 = mesh.vertDistData(i,0);
  let d2 = mesh.vertDistData(i,1);
  let d3 = mesh.vertDistData(i,2);

  let m1 = matMatComposition(translationMat, diagonalMat(4,1/d1), scaleMat);
  let m2 = matMatComposition(translationMat, diagonalMat(4,1/d2), scaleMat);
  let m3 = matMatComposition(translationMat, diagonalMat(4,1/d3), scaleMat);

  let v1 = matVecMult(m1,v1Raw);
  let v2 = matVecMult(m2,v2Raw);
  let v3 = matVecMult(m3,v3Raw);

  ctx.fillStyle = cssRGB(mesh.facesR[i],mesh.facesG[i],mesh.facesB[i]);

  ctx.beginPath(v1[0], v1[1]);
  ctx.lineTo   (v2[0], v2[1]);
  ctx.lineTo   (v3[0], v3[1]);
  ctx.lineTo   (v1[0], v1[1]);
  ctx.fill();
  ctx.stroke();
}

}
