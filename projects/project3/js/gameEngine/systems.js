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


class sInput extends System { //handles tracking keyboard and mouse input and storing them in g.mouse and g.Input
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

class sMove extends System { //moves player entity given keyboard input and translates camera to that position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cPlayer'];
    //also uses cCamera
  }

  systemExecution(entity) { //move player according to inputs, translate camera to player pos
    //using keyboard input to move the player and camera matrix
    for (let i = 0; i < g.input.keysDown.length; i++) { //for every key pressed this frame...
      switch (g.input.keysDown[i]) {
        //MOVEMENT
        case 65:
          { //a key
            entity.cPos.x -= g.input.moveSpeed;
            g.rotUI.drag = false;
            break;
          }
        case 68:
          { //d key
            entity.cPos.x += g.input.moveSpeed;
            g.rotUI.drag = false;
            break;
          }
        case 87:
          { //w key
            entity.cPos.z -= g.input.moveSpeed;
            g.rotUI.drag = false;
            break;
          }
        case 83:
          { //s key
            entity.cPos.z += g.input.moveSpeed;
            g.rotUI.drag = false;
            break;
          }
        case 32:
          { //space bar,
            entity.cPos.y -= g.input.moveSpeed;
            g.rotUI.drag = false;
            break;
          }
        case 16:
          { //shift control
            entity.cPos.y += g.input.moveSpeed;
            g.rotUI.drag = false;
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

/*
this is the system responsible for taking meshes' data and drawing them on the screen
it works in four main steps:

sort all entities by distance so that entities farthest to the camera are stored
at the start of the array; this is done so entities obscure eachother
semi-realistically as entities nearest to the camera will be drawn over faces far away

transform all vertexes by matrices, warp verts by distance to mouse, calculate lighting data

sort all vertexes by their distance to camera so that faces furthest away
are stored at the start of the array;

draw these vertexes to the screen using above calculate data

*/
class sRender extends System {
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cMesh'];
    //also uses cCamera
  }
  update() {
    //precompute all matrices independant of specefic entities
    g.camera.cameraTranslationMat = matMatComp(g.camera.rotationMatrix, g.camera.translationMatrix); //translates entities based on camera position then rotates entities based on camera angle
    g.camera.screenTranslationMat = matMatComp(g.camera.centerMatrix, g.camera.scaleMatrix); //scales entities, then centers them in middle of screen
    this.sortEntitiesByDistToCamera()
    super.update(); //system execution (on every entity)
  }

  sortEntitiesByDistToCamera() {
    /*
    insertion sort implementation which using distance of an entity.cPos to camera
    to sort the sRender's relevantEntities array; this is done so entities occlude eachother
    semi realistically (entities closer to the camera will obscure entities behind it)
    insertion sort is used because it is relatively simple and works in linear time
    for already sorted arrays, as entities' positions won't change drastically every frame
    this will mean the algorithim will often execute in near linear time
    */

    let e = this.relevantEntities; //pointer

    for (let i = 0; i < e.length; i++) { //calc distance to camera
      e[i].cMesh.camToCenter = pythag(
        e[i].cPos.x - g.camera.x,
        e[i].cPos.y - g.camera.y,
        e[i].cPos.z - g.camera.z
      )
    }

    if (e.length > 1) { //only sort if there are more than 2 entities

      for (let i = 1; i < e.length; i++) { //cycle through each element of array
        let j = i - 1;
        while (j >= 0) { //from current index cycle backwards through the array until it reaches the start
          //comparing until it finds an element larger than current index,
          if (e[j].cMesh.camToCenter < e[i].cMesh.camToCenter) {
            //then swap elements and break out of loop
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

  systemExecution(entity) { //for every mesh...

    //precompute all matrices which don't rely on info from individual vertexes (everything but the projection matrix)
    //calculated rotation matrix for model
    let rotationMatModel = matMatComp(
      rotMatX(entity.cPos.angleX),
      rotMatY(entity.cPos.angleY),
      rotMatZ(entity.cPos.angleZ)
    )

    //matrix that translates from model to world coordinates
    let worldTransMat1 = transMat(entity.cPos.x, entity.cPos.y, entity.cPos.z);

    //matrix that translates from model to world position, then translates to camera position
    let preProjectionMat = matMatComp(g.camera.cameraTranslationMat, worldTransMat1, rotationMatModel);

    //transform all vertexes by matrices and store them in ..vertsTransformed 2D array
    for (let i = 0; i < entity.cMesh.verts.length; i++) {

      let vert = entity.cMesh.verts[i].slice(); //copy vertex in "vert" variable
      vert.push(1); //make homo coordinate [x,y,z,w] where w is always 1 to pick up the origin

      vert = matVecMult(preProjectionMat, vert); //transform by pre projection matrix

      entity.cMesh.camToVerts[i] = [ //calc vector to camera
        vert[0] + entity.cPos.x - g.camera.x,
        vert[1] + entity.cPos.y - g.camera.y,
        vert[2] + entity.cPos.z - g.camera.z
      ];
      entity.cMesh.camToVertsMag[i] = mag(entity.cMesh.camToVerts[i]); //calc distance to camera

      //transform by projection matrix which warp verts farther away from the camera center of the screen (logorithimic)
      vert = matVecMult(diagMat(1 / entity.cMesh.camToVertsMag[i]), vert);

      //calculate fade effect which makes verts quickly dissappear into center of screen between distances fadeStart and fadeEnd (linear)
      let shrinkBy = 1;
      if ((entity.cMesh.camToVertsMag[i] > g.camera.fadeStart)) { //fade vert down if far away
        let startAtZero = entity.cMesh.camToVertsMag[i] - g.camera.fadeStart;
        shrinkBy = 1 - (startAtZero / g.camera.fadeEnd); //1 at start, then 0

        shrinkBy = constrain(shrinkBy, 0, 1);

        vert = scalarVecMult(shrinkBy, vert);
        vert[3] = 1; //reset w to 1

      }

      vert = matVecMult(g.camera.screenTranslationMat, vert); //translate to center of screen and scale

      //calculate distance to mouse
      let xDiff = g.mouse.x - vert[0];
      let yDiff = g.mouse.y - vert[1];
      let distToMouse = pythag(xDiff, yDiff);

      //warp verts towards mouse position, this warping/force increases as the mouse gets closer to a given vertex
      let force = 1 / distToMouse;
      vert[0] += force * xDiff * g.rotUI.attractionForce;
      vert[1] += force * yDiff * g.rotUI.attractionForce;

      //make verts become lit up by the mouse (based on distance To Mouse)
      let mouseLightInfluence = ((1 / distToMouse) * 200) - 1;
      mouseLightInfluence = constrain(mouseLightInfluence, -1, .7);
      entity.cMesh.shading[i] = mean(shrinkBy + mouseLightInfluence);

      entity.cMesh.vertsTransformed[i] = vert; //store all these transformations
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

    /*sort all faces within current mesh with insertion sort so that the farther away
    a face is from camera the earlier it appears in the faces array (for occulusion purposes)
    */
    for (let i = 1; i < entity.cMesh.camToFacesMag.length; i++) { //sorts from largest to smallest: insertion sort (very quick for  smaller arrays and already heavily sorted arr (linear speed for fully sorted)) (?)
      let j = i - 1;
      while (j >= 0) { //itterate backwards through the array
        //look for an element which is larger then current index
        if (entity.cMesh.camToFacesMag[j] > entity.cMesh.camToFacesMag[i]) { //swap
          //faces swap
          let facesStore = entity.cMesh.faces[i].slice();
          entity.cMesh.faces[i] = entity.cMesh.faces[j];
          entity.cMesh.faces[j] = facesStore;

          //camToFaceMag swap
          let camToFacesMagStore = entity.cMesh.camToFacesMag[i];
          entity.cMesh.camToFacesMag[i] = entity.cMesh.camToFacesMag[j];
          entity.cMesh.camToFacesMag[j] = camToFacesMagStore;

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

    /*
    cycle through all faces of entity, find the vertexes they point to, set appropriate
    fill/stroke styles, draw them on the screen
    */
    for (let i = 0; i < entity.cMesh.faces.length; i++) {

      //indices to vertices of current face
      const v1Index = entity.cMesh.faces[i][0];
      const v2Index = entity.cMesh.faces[i][1];
      const v3Index = entity.cMesh.faces[i][2];

      //if beyond distance at which mesh is completely faded don't do any calculations or drawing
      if (min(entity.cMesh.camToVertsMag[v1Index], entity.cMesh.camToVertsMag[v2Index], entity.cMesh.camToVertsMag[v3Index]) > g.camera.fadeStart + g.camera.fadeEnd) {
        break;
      }

      //pointers to transformed vectors
      let v1 = entity.cMesh.vertsTransformed[v1Index];
      let v2 = entity.cMesh.vertsTransformed[v2Index];
      let v3 = entity.cMesh.vertsTransformed[v3Index];

      //set fill/stoke colors
      let shading = mean(entity.cMesh.shading[v1Index], entity.cMesh.shading[v2Index], entity.cMesh.shading[v3Index]);
      let r = entity.cMesh.faceColors[i][0] * shading;
      let gg = entity.cMesh.faceColors[i][1] * shading;
      let b = entity.cMesh.faceColors[i][2] * shading;
      let a = entity.cMesh.opacity;


      ctx.fillStyle = cssRGBA([r, gg, b, a]); //lines from mesh data
      ctx.strokeStyle = cssRGBA([0, 0, 0, 1]); //black lines
      ctx.lineWidth = mapFromRanges(entity.cMesh.camToFacesMag[i], 0, g.camera.fadeStart + g.camera.fadeEnd, 3, 0); //increase line width the closer the face is to camera

      //round x,y values to prevent subpixel rendering and improve performance
      v1[0] = Math.round(v1[0]);
      v1[1] = Math.round(v1[1]);
      v2[0] = Math.round(v2[0]);
      v2[1] = Math.round(v2[1]);
      v3[0] = Math.round(v3[0]);
      v3[1] = Math.round(v3[1]);

      //draw path between all 3 verts of current face
      ctx.beginPath(v1[0], v1[1]);
      ctx.lineTo(v2[0], v2[1]);
      ctx.lineTo(v3[0], v3[1]);
      ctx.lineTo(v1[0], v1[1]);
      ctx.closePath();

      ctx.fill();
      ctx.stroke();

    }

  }
}


class sRotUI extends System { //handles the rotation through dragging
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cRotUI'];
    body.addEventListener('mousedown', () => { //collision detection
      g.rotUI.drag = true;
    });

    body.addEventListener('mouseup', () => {
      g.rotUI.drag = false;
    });

    body.addEventListener('mouseleave', () => {
      g.rotUI.drag = false;
    });
  }

  update() {
    //interpolate back to 0
    g.rotUI.rotX -= g.rotUI.rotX * g.rotUI.interpolationRate;
    g.rotUI.rotY -= g.rotUI.rotY * g.rotUI.interpolationRate;

    //if dragging, set rotation x,y values based on difference between original mouse click position and current mouse position
    if (g.rotUI.drag === true) {
      g.rotUI.rotX = (g.mouse.clickY - g.mouse.y) * g.rotUI.sensitivity;
      g.rotUI.rotY = (g.mouse.clickX - g.mouse.x) * g.rotUI.sensitivity;
    }

    //create rotation matrix based on the above calculated values
    g.camera.rotationMatrix = matMatComp(
      rotMatX(-g.rotUI.rotX),
      rotMatY(-g.rotUI.rotY),
    );

    super.update();
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
