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
const zOff = -4;
let scaleMatrix = [
  [scale,0,0],
  [0,scale,0],
  [0,0,scale]
]
for (let i = 0; i < mesh.faces.length/3; i ++){
  let ii = i*3*3;

  let d = mesh.facesDistToCamera[i];
  let v1Raw = [mesh.vertData(i,0,'x'), mesh.vertData(i,0,'y'), mesh.vertData(i,0,'z')-zOff];
  let v2Raw = [mesh.vertData(i,1,'x'), mesh.vertData(i,1,'y'), mesh.vertData(i,1,'z')-zOff];
  let v3Raw = [mesh.vertData(i,2,'x'), mesh.vertData(i,2,'y'), mesh.vertData(i,2,'z')-zOff];

  let projectionMatrix = [
    [1/d,0,0],
    [0,1/d,0],
    [0,0,-1/d]
  ]

  let finalMatrix = matMatMult(projectionMatrix,scaleMatrix);

  let v1 = matVecMult(finalMatrix,v1Raw);
  let v2 = matVecMult(finalMatrix,v2Raw);
  let v3 = matVecMult(finalMatrix,v3Raw);

  let colorByDistR = mapFromRanges (d,0,2,255,0);
  let colorByDistG = mapFromRanges (d,0,2,0,255);
  ctx.fillStyle = cssRGB(colorByDistR,colorByDistG,ran(255));
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
