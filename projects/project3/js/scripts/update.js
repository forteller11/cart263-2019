function update(){
  //if position changes
  console.log(mesh)
  mesh.sortFacesByDistanceToPoint(cameraOrigin);
// systemManager.update();

ctx.fillStyle = cssRGB(255,255,0);
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
// mesh.rotateZ(-.1);
// mesh.rotateX(.1);

// console.log(mesh);
const scale = 100;
const xOff = window.innerWidth/2;
const yOff = window.innerHeight/2;
const zOff = 0;
mesh.xAngle += .001;
mesh.yAngle += .01;
mesh.zAngle += .1;

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

console.log(rotationMatXYZ);

for (let i = 0; i < mesh.faces.length/3; i ++){

  let d1 = mesh.vertDistData(i,0);
  let d2 = mesh.vertDistData(i,1);
  let d3 = mesh.vertDistData(i,2);

  // console.log(mesh.vertsDistToCamera);
  let v1Raw = [mesh.vertData(i,0,'x'), mesh.vertData(i,0,'y'), mesh.vertData(i,0,'z')-zOff];
  let v2Raw = [mesh.vertData(i,1,'x'), mesh.vertData(i,1,'y'), mesh.vertData(i,1,'z')-zOff];
  let v3Raw = [mesh.vertData(i,2,'x'), mesh.vertData(i,2,'y'), mesh.vertData(i,2,'z')-zOff];
  console.log(v1Raw);
  console.log(v2Raw);
  console.log(v3Raw);
  console.log('===================')

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

  let rotScaleMat = matMatMult(rotationMatXYZ,scaleMat);

  let m1 = matMatMult(rotScaleMat,projMat1);
  let m2 = matMatMult(rotScaleMat,projMat2);
  let m3 = matMatMult(rotScaleMat,projMat3);

  let v1 = matVecMult(m1,v1Raw);
  let v2 = matVecMult(m2,v2Raw);
  let v3 = matVecMult(m3,v3Raw);

  console.log(v1);
  console.log(v2);
  console.log(v3);
  console.log('===================')

  ctx.fillStyle = cssRGB(mesh.facesR[i],mesh.facesG[i],mesh.facesB[i]);
// console.log(`FACE${i}`)
// console.log(`${Math.round(v1[0])}, ${Math.round(v1[1])}, ${Math.round(v1[2])}`);
// console.log(`${Math.round(v2[0])}, ${Math.round(v2[1])}, ${Math.round(v2[2])}`)
// console.log(`${Math.round(v3[0])}, ${Math.round(v3[1])}, ${Math.round(v3[2])}`)
// console.log(`================================================================`)
  ctx.beginPath(v1[0]+xOff, v1[1]+yOff);
  ctx.lineTo   (v2[0]+xOff, v2[1]+yOff);
  ctx.lineTo   (v3[0]+xOff, v3[1]+yOff);
  ctx.lineTo   (v1[0]+xOff, v1[1]+yOff);
  ctx.fill();
}

}
