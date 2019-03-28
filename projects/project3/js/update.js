function update(){
// systemManager.update();

ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
mesh.rotateZ(.1);
console.log(vector);

for (let i = 0; i < mesh.faces.length; i ++){
  // console.log('FACE '+i);
  ctx.beginPath();
  ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
  ctx.fillStyle = cssRGB(ran(255),ran(255),ran(255));
  for (let j = 0; j < mesh.faces[i].length; j++){
    let vert = mesh.verts[mesh.faces[i][j]];
  //   console.log(`
  // vertIndex: ${mesh.faces[i][j]}
  // Components:${vert.x},${vert.y},${vert.z}`)
      ctx.lineTo((vert.x)*window.innerWidth/2, (vert.y)*window.innerHeight/2); //x,y of vec Index
  }
  // console.log('fill');
  ctx.fillStyle = cssRGB(255,0,0);
  ctx.fill();
}

}
