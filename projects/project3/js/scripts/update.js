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
  ctx.fillStyle = cssRGB(colorByDistR,colorByDistG,125);
  ctx.beginPath(mesh.faces[i].v1.x,mesh.faces[i].v1.y);
  ctx.lineTo(mesh.faces[i].v2.x*scale+xOff,mesh.faces[i].v2.y*scale+yOff);
  ctx.lineTo(mesh.faces[i].v3.x*scale+xOff,mesh.faces[i].v3.y*scale+yOff);
  ctx.lineTo(mesh.faces[i].v1.x*scale+xOff,mesh.faces[i].v1.y*scale+yOff);
  ctx.fill();
}

}
