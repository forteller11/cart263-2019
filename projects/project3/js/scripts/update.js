function update(){
  //if position changes
  console.log(mesh)
ctx.fillStyle = cssRGB(255,255,0);
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);



// console.log(mesh);
const scale = 300;
const xOff = window.innerWidth/2;
const yOff = window.innerHeight/2;
const zOff = 0;
// mesh.xAngle += .01;
// mesh.yAngle += .01;
mesh.zAngle -= .001;

let scaleMat = [
  [scale,0,0],
  [0,scale,0],
  [0,0,scale]
]

let rotationMatX = rotationMat(mesh.xAngle, 'z');
let rotationMatY = rotationMat(mesh.yAngle, 'y');
let rotationMatZ = rotationMat(mesh.zAngle, 'z');
let rotationMatXY  =   matMatMult(rotationMatX, rotationMatY);
let rotationMatXYZ =   matMatMult(rotationMatXY,rotationMatZ);

for (let i = 0; i < mesh.verts.length/3; i++){ //rotate all verts by rotation matrix
  let ii = i*3;
  let vert = [ mesh.verts[ii+0],  mesh.verts[ii+1],  mesh.verts[ii+2] ]; //encapsulate verts ntuples intoa  single array

  let rotatedVec = matVecMult(rotationMatXYZ,vert); //multiply vertex by rotation matrix

  //store rotated vertex
  mesh.verts[ii+0] = rotatedVec[0];
  mesh.verts[ii+1] = rotatedVec[1];
  mesh.verts[ii+2] = rotatedVec[2];
}
mesh.sortFacesByDistanceToPoint(cameraOrigin);


for (let i = 0; i < mesh.faces.length/3; i ++){
  console.log(mesh.vertDistData(i,0));


  // console.log(mesh.vertsDistToCamera);
  let v1Raw = [mesh.vertData(i,0,'x'), mesh.vertData(i,0,'y'), mesh.vertData(i,0,'z')-zOff];
  let v2Raw = [mesh.vertData(i,1,'x'), mesh.vertData(i,1,'y'), mesh.vertData(i,1,'z')-zOff];
  let v3Raw = [mesh.vertData(i,2,'x'), mesh.vertData(i,2,'y'), mesh.vertData(i,2,'z')-zOff];

  let d1 = mesh.vertDistData(i,0);
  let d2 = mesh.vertDistData(i,1);
  let d3 = mesh.vertDistData(i,2);


  // console.log(v1Raw);
  // console.log(v2Raw);
  // console.log(v3Raw);
  // console.log('===================')

  let projMat1 = [
    [1/d1,0,0],
    [0,1/d1,0],
    [0,0,1/d1]
  ]

  let projMat2 = [
    [1/d2,0,0],
    [0,1/d2,0],
    [0,0,1/d2]
  ]

  let projMat3 = [
    [1/d3,0,0],
    [0,1/d3,0],
    [0,0,1/d3]
  ]

  //transform world matrix
  //world rotation/cmarea matrix

  let m1 = matMatMult(scaleMat,projMat1);
  let m2 = matMatMult(scaleMat,projMat2);
  let m3 = matMatMult(scaleMat,projMat3);

  let v1 = matVecMult(m1,v1Raw);
  let v2 = matVecMult(m2,v2Raw);
  let v3 = matVecMult(m3,v3Raw);

  // console.log(v1);
  // console.log(v2);
  // console.log(v3);
  // console.log('===================')

  ctx.fillStyle = cssRGB(mesh.facesR[i],mesh.facesG[i],mesh.facesB[i]);

  ctx.beginPath(v1[0]+xOff, v1[1]+yOff);
  ctx.lineTo   (v2[0]+xOff, v2[1]+yOff);
  ctx.lineTo   (v3[0]+xOff, v3[1]+yOff);
  ctx.lineTo   (v1[0]+xOff, v1[1]+yOff);
  ctx.fill();
}

}
