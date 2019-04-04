function update(){
  systemManager.update();
  console.log(systemManager);
}

// function update(){
//   //if position changes
//   // console.log(mesh)
// ctx.fillStyle = cssRGB(255,255,0);
// ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
// ctx.strokeStyle = cssRGB(255,255,0);
//
//
// // console.log(mesh);
// const scale = 100;
//
// const xOff = window.innerWidth/2;
// const yOff = window.innerHeight/2;
// const zOff = 0;
//
// mesh.xAngle += .005;
// mesh.yAngle -= .001;
// mesh.zAngle -= .00001;
//
// let rSpd = 20;
// let rotationMatXYZ = matMatComp(rotMat(Math.sin(mesh.xAngle)/rSpd, 'x'), rotMat(Math.sin(mesh.yAngle)/rSpd, 'y'), rotMat(Math.sin(mesh.zAngle)/rSpd, 'z'));
//
// for (let i = 0; i < mesh.verts.length/3; i++){ //rotate all verts by rotation matrix
//   let ii = i*3;
//   let vert = [ mesh.verts[ii+0],  mesh.verts[ii+1],  mesh.verts[ii+2], 1 ]; //encapsulate verts ntuples intoa  single array
//
//   let rotatedVec = matVecMult(rotationMatXYZ,vert); //multiply vertex by rotation matrix
//
//   //store rotated vertex
//   mesh.verts[ii+0] = rotatedVec[0];
//   mesh.verts[ii+1] = rotatedVec[1];
//   mesh.verts[ii+2] = rotatedVec[2];
// }
// mesh.sortFacesByDistanceToPoint(cameraOrigin);
//
//
// for (let i = 0; i < mesh.faces.length/3; i ++){
//   // console.log(mesh.vertsDistToCamera);
//   let v1Raw = [mesh.vertData(i,0,'x'), mesh.vertData(i,0,'y'), mesh.vertData(i,0,'z'), 1];
//   let v2Raw = [mesh.vertData(i,1,'x'), mesh.vertData(i,1,'y'), mesh.vertData(i,1,'z'), 1];
//   let v3Raw = [mesh.vertData(i,2,'x'), mesh.vertData(i,2,'y'), mesh.vertData(i,2,'z'), 1];
//
//   let d1 = mesh.vertDistData(i,0);
//   let d2 = mesh.vertDistData(i,1);
//   let d3 = mesh.vertDistData(i,2);
//
//   let m1 = matMatComp(transMat(xOff,yOff,zOff), diagMat(1/d1), diagMat(scale));
//   let m2 = matMatComp(transMat(xOff,yOff,zOff), diagMat(1/d2), diagMat(scale));
//   let m3 = matMatComp(transMat(xOff,yOff,zOff), diagMat(1/d3), diagMat(scale));
//
//   let v1 = matVecMult(m1,v1Raw);
//   let v2 = matVecMult(m2,v2Raw);
//   let v3 = matVecMult(m3,v3Raw);
//
//   ctx.fillStyle = cssRGB(mesh.facesR[i],mesh.facesG[i],mesh.facesB[i]);
//
//   ctx.beginPath(v1[0], v1[1]);
//   ctx.lineTo   (v2[0], v2[1]);
//   ctx.lineTo   (v3[0], v3[1]);
//   ctx.lineTo   (v1[0], v1[1]);
//   ctx.fill();
//   ctx.stroke();
// }
//
// }
