function update(){
  //if position changes

  mesh.sortFacesByDistanceToPoint(cameraOrigin);
// systemManager.update();

ctx.fillStyle = cssRGB(255,255,0);
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
// mesh.rotateZ(-.1);
mesh.rotateX(.1);

console.log(mesh);
const scale = 500;
const xOff = window.innerWidth/2;
const yOff = window.innerHeight/2;

for (let i = 0; i < mesh.faces.length; i ++){
  // console.log('FACE '+i);
  console.log(mesh.faces[i].distTo(cameraOrigin));
  let distTo = mesh.faces[i].distTo(cameraOrigin);
  let colorByDistR = mapFromRanges (distTo,0,2,255,0);
    let colorByDistG = mapFromRanges (distTo,0,2,0,255);
  ctx.fillStyle = cssRGB(colorByDistR,colorByDistG,ran(255));
  // const v1XCam = mesh.faces[i].v1.x-cameraOrigin.x;
  let v1XProj = (((mesh.faces[i].v1.x/mesh.faces[i].v1.z)/distTo  )*scale)+xOff;
  let v1YProj = (((mesh.faces[i].v1.y/mesh.faces[i].v1.z)/distTo  )*scale)+yOff;
  let v3XProj = (((mesh.faces[i].v2.x/mesh.faces[i].v2.z)/distTo )*scale)+xOff;
  let v3YProj = (((mesh.faces[i].v2.y/mesh.faces[i].v2.z)/distTo  )*scale)+yOff;
  let v2XProj = (((mesh.faces[i].v3.x/mesh.faces[i].v3.z)/distTo  )*scale)+xOff;
  let v2YProj = (((mesh.faces[i].v3.y/mesh.faces[i].v3.z)/distTo  )*scale)+yOff;


  ctx.beginPath(v1XProj, v1YProj);
  ctx.lineTo   (v2XProj, v2YProj);
  ctx.lineTo   (v3XProj, v3YProj);
  ctx.lineTo   (v1XProj, v1YProj);
  ctx.fill();
}

}
