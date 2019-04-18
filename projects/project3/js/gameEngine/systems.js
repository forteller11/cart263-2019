'use strict';
class System { //base functionality for all systems
  constructor(arrayOfRelevantEntities) {
    this.relevantEntities = []; //array of relevant entities to system
    this.requiredComponents = []; //array of relevant components
    this.requiredBlueprints = []; //array of required blueprints the entity must have
  }

  systemExecution(entity) { //occurs every frame for every entity
    console.log('overide this method for useful system');
  }

  update() { //occurs every frame
    for (let entity of this.relevantEntities) {
      this.systemExecution(entity);
    }
  }

}


class sPhysicsTransform extends System { //applys drags and phy constants (gravity if applicable)
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cPhysics'];
  }

  systemExecution(entity) {
    if (debugMode) {
      ctx.strokeRect(entity.cPos.x, entity.cPos.y, 2, 2);
    }
    entity.cPos.angleX += entity.cPhysics.angularVel.x;
    entity.cPos.angleY += entity.cPhysics.angularVel.y;
    entity.cPos.angleZ += entity.cPhysics.angularVel.z;

    entity.cPhysics.angularVel.mult(g.physics.polarDrag);

    if (entity.cPhysics.inert) { //if a inert entity
      entity.cPhysics.x = 0;
      entity.cPhysics.y = 0;
      entity.cPhysics.z = 0;
      // entity.cPhysics.angularVel = 0;

    } else {
      //apply wind
      entity.cPhysics.vel.x += g.physics.windX;
      entity.cPhysics.vel.y += g.physics.windY;
      entity.cPhysics.vel.z += g.physics.windZ;

      //transform position based on velocties
      entity.cPos.x += entity.cPhysics.vel.x;
      entity.cPos.y += entity.cPhysics.vel.y;
      entity.cPos.z += entity.cPhysics.vel.z;

      //apply drag and constrain velocties
      entity.cPhysics.vel.mult(g.physics.cartesianDrag);
    }
  }

}

class sMove extends System { //moves player entity given keyboard input and translates camera to that position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cPlayer'];
    //also uses cCamera
  }

  systemExecution(entity) { //move player according to inputs, translate camera to player pos
    //mouse input for player movement

    // const deltaMouseX = g.mouse.histX[g.mouse.histX.length - 1] - g.mouse.histX[g.mouse.histX.length - 2];
    // const deltaMouseY = g.mouse.histY[g.mouse.histY.length - 1] - g.mouse.histY[g.mouse.histY.length - orientation  console.log(`${Math.round(g.camera.angleX*100)/100}, ${Math.round(g.camera.angleY*100/100)}, ${Math.round(g.camera.angleZ*100/100)} `);
    //keyboard input for player movement

    for (let i = 0; i < g.input.keysDown.length; i++) { //for every key pressed this frame...
      // switch (g.input.keysDown[i]) {
      //   //ROTATIONS
      //   case 37: //left arrow
      //     entity.cPos.angleY -= g.camera.rotateSpeed;
      //     break;
      //   case 39: //right arrow
      //     entity.cPos.angleY += g.camera.rotateSpeed;
      //     break;
      //   case 38: //up arrow
      //     entity.cPos.angleX -= g.camera.rotateSpeed;
      //     break;
      //   case 40: //down arrow
      //     entity.cPos.angleX += g.camera.rotateSpeed;
      //     break;
      //   case 81: //Q
      //     entity.cPos.angleZ += g.camera.rotateSpeed;
      //     break;
      //   case 69: //E
      //     entity.cPos.angleZ -= g.camera.rotateSpeed;
      //     break;
      // }
      // g.camera.angleX = entity.cPos.angleX;
      // g.camera.angleY = entity.cPos.angleY;
      // g.camera.angleZ = entity.cPos.angleZ;
      //
      // g.camera.rotationMatrix = matMatComp(
      //   rotMatX(g.camera.angleX),
      //   rotMatY(g.camera.angleY),
      //   rotMatZ(g.camera.angleZ)
      // );

      let moveForward = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, [0, 0, 1, 1]));
      moveForward.splice(3, 1);
      console.log(moveForward);
      console.table(g.camera.rotationMatrix)
      // let moveRight = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, g.camera.rightOrientation));
      // let moveUp = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, g.camera.upOrientation));

      switch (g.input.keysDown[i]) {
        //MOVEMENT
        case 65:
          { //a key
            // entity.cPos.x -= moveRight[0];
            // entity.cPos.y += moveRight[1];
            // entity.cPos.z += moveRight[2];
            entity.cPos.x -= g.input.moveSpeed;
            break;
          }
        case 68:
          { //d key
            // entity.cPos.x += moveRight[0];
            // entity.cPos.y -= moveRight[1];
            // entity.cPos.z -= moveRight[2];
            entity.cPos.x += g.input.moveSpeed;
            break;
          }
        case 87:
          { //w key

            entity.cPos.z -= g.input.moveSpeed;
            // entity.cPos.x += moveForward[0];
            // entity.cPos.y += moveForward[1];
            // entity.cPos.z -= moveForward[2];

            break;
          }
        case 83:
          { //s key
            entity.cPos.z += g.input.moveSpeed;
            // entity.cPos.x -= moveForward[0];
            // entity.cPos.y -= moveForward[1];
            // entity.cPos.z += moveForward[2];
            break;
          }
        case 32:
          { //space bar, rotate by ... degrees
            // entity.cPos.x += moveUp[0];
            // entity.cPos.y -= moveUp[1];
            entity.cPos.y -= g.input.moveSpeed;
            break;
          }
        case 16:
          { //shift control
            // entity.cPos.x -= moveUp[0];
            // entity.cPos.y += moveUp[1];
            entity.cPos.y += g.input.moveSpeed;
            break;
          }

      }

    }
    //move camera to player position and angle
    g.camera.x = entity.cPos.x;
    g.camera.y = entity.cPos.y;
    g.camera.z = entity.cPos.z;
    g.camera.translationMatrix = transMat(-g.camera.x, -g.camera.y, -g.camera.z);

  }

}

class sRender extends System { //applys drags and phy constants (gravity if applicable)
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cMesh'];
    //also uses cCamera
  }
  update() {

    this.sortEntitiesByDistToCamera()
    super.update(); //system execution (on every entity)
  }

  sortEntitiesByDistToCamera() {
    let e = this.relevantEntities;

    for (let i = 0; i < e.length; i++) { //calc distance to camera
      e[i].cMesh.camToCenter = pythag(
        e[i].cPos.x - g.camera.x,
        e[i].cPos.y - g.camera.y,
        e[i].cPos.z - g.camera.z
      )
      // console.log(e[i].cMesh.camToCenter);
      // console.log('----')
    }

    if (e.length > 1) { //only sort if there are more than 2 entities

      for (let i = 1; i < e.length; i++) {
        let j = i - 1;
        while (j >= 0) {
          if (e[j].cMesh.camToCenter < e[i].cMesh.camToCenter) {
            //swap
            let eStore = e[i];
            e[i] = e[j];
            e[j] = eStore;
            break;
          }
          j--;
        }
      }
    }
  }

  systemExecution(entity) { //for every mesh, then translate based and around cam

    //calculated rotated verts
    let rotationMatXYZ = matMatComp(
      rotMatX(entity.cPos.angleX),
      rotMatY(entity.cPos.angleY),
      rotMatZ(entity.cPos.angleZ)
    )

    for (let i = 0; i < entity.cMesh.verts.length; i++) { //rotate all verts by rotation matrix
      let vHomo = entity.cMesh.verts[i].slice();
      vHomo.push(1); //make homo coordinate [x,y,z,w]
      entity.cMesh.vertsRotated[i] = matVecMult(rotationMatXYZ, vHomo); //multiply vertex by rotation matrix
    }

    let worldTransMat1 = transMat(entity.cPos.x, entity.cPos.y, entity.cPos.z); //translates from model to world coordinates
    let preProjectionMat = matMatComp(g.camera.rotationMatrix, g.camera.scaleMatrix, g.camera.translationMatrix, worldTransMat1); //precalc camera for better perf
    // console.table(g.camera.translationMatrix);
    let postProjectionMat = g.camera.centerMatrix; //precalc these for better perf

    this.sortFacesByDistanceToPoint(entity);

    for (let i = 0; i < entity.cMesh.faces.length; i++) {
      // homogenize coords from [x,y,z] to [x,y,z,w];
      const wInit = 1;

      const v1Index = entity.cMesh.faces[i][0];
      const v2Index = entity.cMesh.faces[i][1];
      const v3Index = entity.cMesh.faces[i][2];

      let v1Raw = entity.cMesh.vertsRotated[v1Index].slice();
      let v2Raw = entity.cMesh.vertsRotated[v2Index].slice();
      let v3Raw = entity.cMesh.vertsRotated[v3Index].slice();


      //store distance of vectors in d vars
      let d1 = entity.cMesh.camToVertsMag[v1Index];
      let d2 = entity.cMesh.camToVertsMag[v2Index];
      let d3 = entity.cMesh.camToVertsMag[v3Index];

      // console.log(entity.cMesh.camToFacesMag[i]);
      // console.log(d1);
      //  at distance from camera g.camera.fadeStart begin shrinking inwards until g.camera.fadeEnd distance
      let vAvg = meanVec(v1Raw, v2Raw, v3Raw);
      vAvg.splice(3, 1); //remove 4th dimension
      let lightAmount = 1;
      if (entity.cMesh.shading === true){
      lightAmount = (dot(normalize(vAvg), g.camera.lightDir) + 1) / 2;
      }
      // console.log(lightAmount)
      let shrinkBy = 1;
      if ((entity.cMesh.camToFacesMag[i] > g.camera.fadeStart)) {
        let startAtZero = entity.cMesh.camToFacesMag[i] - g.camera.fadeStart;
        shrinkBy = 1 - (startAtZero / g.camera.fadeEnd); //1 at start, then 0
        shrinkBy = constrain(shrinkBy, 0, 1);
        // console.log(shrinkBy);
        v1Raw = scalarVecMult(shrinkBy, v1Raw);
        v1Raw[3] = wInit;
        v2Raw = scalarVecMult(shrinkBy, v2Raw);
        v2Raw[3] = wInit;
        v3Raw = scalarVecMult(shrinkBy, v3Raw);
        v3Raw[3] = wInit;
      }





      //compose giant transformation matrices for each vector in order right to left
      let m1 = matMatComp(postProjectionMat, diagMat(1 / d1), preProjectionMat);
      let m2 = matMatComp(postProjectionMat, diagMat(1 / d2), preProjectionMat);
      let m3 = matMatComp(postProjectionMat, diagMat(1 / d3), preProjectionMat);

      //transform vectors using the appropriate matrices
      let v1 = matVecMult(m1, v1Raw);
      let v2 = matVecMult(m2, v2Raw);
      let v3 = matVecMult(m3, v3Raw);

      if (systemManager.entityHasComponent('cRotUI',entity,)){
        let vArr = [v1,v2,v3];
        let distSum = 0;
        for (let v of vArr){
          // console.log(g.mouse.y)
          let xDiff = g.mouse.x - v[0];
          let yDiff = g.mouse.y - v[1];
          let dist = pythag (xDiff,yDiff);
          distSum+= dist;
          let force = 1/dist;
          v[0] += force * xDiff * g.rotUI.attractionForce;
          v[1] += force * yDiff * g.rotUI.attractionForce;
          // console.log(force * xDiff * g.rotUI.attractionForce)
        }
        if (g.mouse.down){
          lightAmount = 1+(1/(distSum/3)*50) + .1;
        } else {
          lightAmount = 1+(1/(distSum/3)*10);
        }
      }
      // console.log(v3[2]);
      // console.log('=======COMPOSED__MATRICES==========')
      // console.log(m1);
      // console.log(m2);
      // console.log(m3);
      // console.log('=======VECTORS___TRANSFORMED==========');

      // console.log(v1Raw);
      // console.log('===========');
      //draw resulting vectors on the screen using the appropriate color of the face

      // if (entity.cMesh.camToFaces[i][2] > g.camera.clippingThreshold) { //if in front of camera draw, if behind, don't draw
      if (shrinkBy > 0) {

        // ctx.fillStyle = cssRGBA(entity.cMesh.faceColors[i]);
        ctx.fillStyle = cssRGBA([
          entity.cMesh.faceColors[i][0] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.faceColors[i][1] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.faceColors[i][2] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.opacity
        ]);

        ctx.strokeStyle = cssRGBA([
          entity.cMesh.faceColors[i][0] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.faceColors[i][1] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.faceColors[i][2] * Math.pow(shrinkBy, 3) * lightAmount,
          entity.cMesh.opacity
        ]);

        // ctx.strokeStyle = cssRGBA([
        //   bgColor[0]*lightAmount,
        //   bgColor[1]*lightAmount,
        //   bgColor[2]*lightAmount,
        //   1 - shrinkBy]);

        //roudn to prevent subpixel rendering and improve performance
        v1[0] = Math.round(v1[0]);
        v1[1] = Math.round(v1[1]);
        v2[0] = Math.round(v2[0]);
        v2[1] = Math.round(v2[1]);
        v3[0] = Math.round(v3[0]);
        v3[1] = Math.round(v3[1]);
        // console.log(v1);
        // console.log(v2);
        // console.log(v3);
        // if (v1[2] < 0) {
        // ctx.fillStyle = cssRGBA([
        //   entity.cMesh.faceColors[i][0] * Math.pow(shrinkBy, 3) * lightAmount,
        //   entity.cMesh.faceColors[i][1] * Math.pow(shrinkBy, 3) * lightAmount,
        //   entity.cMesh.faceColors[i][2] * Math.pow(shrinkBy, 3) * lightAmount,
        //   1/v1[2]*-1
        // ]);
        // ctx.clip();
        // ctx.arc(window.innerWidth / 2, window.innerHeight / 2, g.camera.backgroundScale, 0, Math.PI * 2);

        ctx.beginPath(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.lineTo(v3[0], v3[1]);
        ctx.lineTo(v1[0], v1[1]);
        ctx.fill();
        // }

        ctx.stroke();

      }
    }

  }


  sortFacesByDistanceToPoint(entity) {
    //calculate vector and dist from camera to every point and face
    let camPos = [
      g.camera.x,
      g.camera.y,
      g.camera.z
    ];

    for (let i = 0; i < entity.cMesh.vertsRotated.length; i++) {
      entity.cMesh.camToVerts[i] = [
        entity.cMesh.vertsRotated[i][0] + entity.cPos.x - g.camera.x,
        entity.cMesh.vertsRotated[i][1] + entity.cPos.y - g.camera.y,
        entity.cMesh.vertsRotated[i][2] + entity.cPos.z - g.camera.z
      ]
      // if (  entity.cMesh.camToVertsMag[i][2] > g.camera.clippingThreshold){ //only calculate mag if in front of camera
      entity.cMesh.camToVertsMag[i] = mag(entity.cMesh.camToVerts[i]);
      // }
      // console.log(entity.cMesh.camToVertsMag[i]);
    }

    for (let i = 0; i < entity.cMesh.faces.length; i++) { //for evrey face calc avg distToCamera from the verts that comrpise it
      // console.log(entity.cMesh.camToVerts);
      entity.cMesh.camToFaces[i] = meanVec(
        entity.cMesh.camToVerts[entity.cMesh.faces[i][0]],
        entity.cMesh.camToVerts[entity.cMesh.faces[i][1]],
        entity.cMesh.camToVerts[entity.cMesh.faces[i][2]]
      );


      entity.cMesh.camToFacesMag[i] = mag(entity.cMesh.camToFaces[i]);
    }

    // console.log(entity.cMesh.camToFaces);
    for (let i = 1; i < entity.cMesh.camToFacesMag.length; i++) { //sorts from largest to smallest: insertion sort (very quick for  smaller arrays and already heavily sorted arr (linear speed for fully sorted)) (?)
      // console.log('ah');
      let j = i - 1;
      while (j >= 0) { //itterate backwards through array until find an element which is smaller then index
        if (entity.cMesh.camToFacesMag[j] > entity.cMesh.camToFacesMag[i]) { //swap


          //faces swap
          let facesStore = entity.cMesh.faces[i].slice();
          entity.cMesh.faces[i] = entity.cMesh.faces[j];
          entity.cMesh.faces[j] = facesStore;

          //camToFaceMag swap
          // console.log(entity.cMesh.camToFacesMag[i]);
          // console.log(entity.cMesh.camToFacesMag[j]);
          let camToFacesMagStore = entity.cMesh.camToFacesMag[i];
          entity.cMesh.camToFacesMag[i] = entity.cMesh.camToFacesMag[j];
          entity.cMesh.camToFacesMag[j] = camToFacesMagStore;
          // console.log(entity.cMesh.camToFacesMag[i]);
          // console.log(entity.cMesh.camToFacesMag[j]);
          // console.log('===============');

          //camToFace swap
          let camToFacesStore = entity.cMesh.camToFaces[i].slice();
          entity.cMesh.camToFaces[i] = entity.cMesh.camToFaces[j];
          entity.cMesh.camToFaces[j] = camToFacesStore;

          //face colors swap
          let faceColorsStore = entity.cMesh.faceColors[i].slice();
          entity.cMesh.faceColors[i] = entity.cMesh.faceColors[j];
          entity.cMesh.faceColors[j] = faceColorsStore;

          break;
        }

        j--;
      }
    }

  }

}


class sInput extends System { //handles dragging behavior and transforming the entity being dragged
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = [];

    document.addEventListener('keydown', (e) => { //n mouse click
      let redundant = false; //is key already in keyPressed
      for (let i = 0; i < g.input.keysDown.length; i++) {
        if (e.keyCode === g.input.keysDown[i]) {
          redundant = true;
          break;
        }
      }

      if (redundant === false) { //if key is not currently in keysDown array push it
        g.input.keysDown.push(e.keyCode);
      }
    });

    document.addEventListener('keyup', (e) => { //n mouse click
      for (let i = 0; i < g.input.keysDown.length; i++) {
        if (e.keyCode === g.input.keysDown[i]) {
          g.input.keysDown.splice(i, 1)
          break;
        }
      }
    });

    document.addEventListener('mousedown', (e) => { //n mouse click
      g.mouse.down = true;
      g.mouse.clickX = e.clientX;
      g.mouse.clickY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => { //update mouse pos
      g.mouse.x = e.clientX;
      g.mouse.y = e.clientY;
    });

    document.addEventListener('mouseup', (e) => { // on release of mouse
      g.mouse.down = false;
    });

  } //END OF CONSTRUCTOR

  update() {
    if (g.mouse.histX.length < g.mouse.histMaxLength) { //store mouse positions every frame
      g.mouse.histX.push(g.mouse.x);
      g.mouse.histY.push(g.mouse.y);
    } else { //remove oldest, add newest pos
      g.mouse.histX.splice(0, 1);
      g.mouse.histY.splice(0, 1);
      g.mouse.histX.push(g.mouse.x);
      g.mouse.histY.push(g.mouse.y);
    }
}

}

class sRotUI extends System { //handles dragging behavior and transforming the entity being dragged
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cRotUI'];
  }

update() {
  //interpolate back into place
  g.rotUI.rotX = g.rotUI.rotX * g.rotUI.interpolationRate;
  g.rotUI.rotY -= g.rotUI.rotY * g.rotUI.interpolationRate;
  //create rotation matrix based on mouse pos since last click
  if (g.mouse.down === true){
    g.rotUI.rotX = (g.mouse.clickY - g.mouse.y)*g.rotUI.sensitivity;
    g.rotUI.rotY = (g.mouse.clickX - g.mouse.x)*g.rotUI.sensitivity;
  }

  g.camera.rotationMatrix = matMatComp(
    rotMatX(-g.rotUI.rotX),
    rotMatY( g.rotUI.rotY),
  );
  super.update();
}
systemExecution(entity){
  // console.log(d)\
  if (g.mouse.down === true){
    entity.cMesh.scale(g.rotUI.scale);
} else { //scale size
    let d = pythag(g.mouse.x-window.innerWidth/2,g.mouse.y-window.innerHeight/2);
    let s = (1/d)*(g.rotUI.scale*600);
    let alpha = (s*50)-2;
    alpha = constrain(alpha,0,1);
    console.log(s)
    s = constrain(s,0,g.rotUI.scale);
        entity.cMesh.opacity = alpha;
    entity.cMesh.scale(s);
}
  entity.cPos.x = g.camera.x + g.rotUI.xBase;
  entity.cPos.y = g.camera.y + g.rotUI.yBase;
  entity.cPos.z = g.camera.z + g.rotUI.zBase;
}

}
