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
it works in five main steps:

1: I sort all the faces of a mesh so the faces farthest array are first in the array
this means once the system uses html canvas to literally draw/rasterize the image
it faces that are nearer to the camera overlap and obscure faces that are farther away
(primitive type of z buffering);

2: i set up all transformation matrices and precompute as many as I can

3: i transform all vertexes

4: i perform any lighting calculations

5: go through and 3 vertexes of each face and draw the transformed verts on the screen
*/
class sRender extends System {
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cMesh'];
    //also uses cCamera
  }
  update() {
    //compute all matrices independant of entities once for performance
    g.camera.transScaleRotMatrix = matMatComp(g.camera.rotationMatrix, g.camera.scaleMatrix, g.camera.translationMatrix);
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
    let rotationMatModel = matMatComp(
      rotMatX(entity.cPos.angleX),
      rotMatY(entity.cPos.angleY),
      rotMatZ(entity.cPos.angleZ)
    )
    let worldTransMat1 = transMat(entity.cPos.x, entity.cPos.y, entity.cPos.z); //translates from model to world coordinates
    //translate entities based on their position, based on the camera position, scale them, rotate the world around the camera position
    let preProjectionMat = matMatComp(g.camera.transScaleRotMatrix , worldTransMat1);
    let postProjectionMat = g.camera.centerMatrix; //centers the image at 0,0 after projection matrix is applied

    for (let i = 0; i < entity.cMesh.verts.length; i++) { //transform all vertexes and store them in ..vertsTransformed 2D array

      let vert = entity.cMesh.verts[i].slice(); //copy vertex in "vert" variable
      vert.push(1); //make homo coordinate [x,y,z,w] where w is always 1 to pick up the origin

      entity.cMesh.vertsTransformed[i] = matVecMult(rotationMatModel, vert);

      //calculate vector to camera
      // console.log(entity.cMesh.vertsTransformed)
        entity.cMesh.camToVerts[i] = [
          entity.cMesh.vertsTransformed[i][0] + entity.cPos.x - g.camera.x,
          entity.cMesh.vertsTransformed[i][1] + entity.cPos.y - g.camera.y,
          entity.cMesh.vertsTransformed[i][2] + entity.cPos.z - g.camera.z
        ]
        //calculate distance to camera
        entity.cMesh.camToVertsMag[i] = mag(entity.cMesh.camToVerts[i]);

      //compose giant transformation matrices for each vertex in order right to left
      let transformationMatrix = matMatComp(postProjectionMat, diagMat(1 / entity.cMesh.camToVertsMag[i]), preProjectionMat);

      entity.cMesh.vertsTransformed[i] = matVecMult(transformationMatrix, vert); //multiply vertex by rotation matrix


    }

    this.sortFacesByDistanceToPoint(entity); //sort all faces by their distance to the camera for a primitive zbuffering / occulusion solution

    for (let i = 0; i < entity.cMesh.faces.length; i++) {
      const v1Index = entity.cMesh.faces[i][0];
      const v2Index = entity.cMesh.faces[i][1];
      const v3Index = entity.cMesh.faces[i][2];

      //store distance of vectors in d vars
      let d1 = entity.cMesh.camToVertsMag[v1Index];
      let d2 = entity.cMesh.camToVertsMag[v2Index];
      let d3 = entity.cMesh.camToVertsMag[v3Index];

      //transform vectors using the appropriate matrices
      let v1 = entity.cMesh.vertsTransformed[v1Index].slice();
      let v2 = entity.cMesh.vertsTransformed[v2Index].slice();
      let v3 = entity.cMesh.vertsTransformed[v3Index].slice();

//if beyond distance at which mesh is completely faded don't do any calculations or drawing
  if (min(entity.cMesh.camToVertsMag[v1Index], entity.cMesh.camToVertsMag[v2Index], entity.cMesh.camToVertsMag[v3Index]) > g.camera.fadeStart+g.camera.fadeEnd){
    break;
  }


      const wInit = 1; //w always = w

      let lightAmount = 1;
      //calculate light based off normal of face (currently faulty)
      let vAvg = meanVec(v1, v2, v3);
      vAvg.splice(3, 1); //remove 4th dimension
      if (entity.cMesh.shading === true){
      lightAmount = (dot(normalize(vAvg), g.camera.lightDir) + 1) / 2;
      }


      // at distance from camera g.camera.fadeStart begin shrinking inwards until g.camera.fadeEnd distance
      let fS = g.camera.fadeStart;
      let shrinkBy = 1;
      if ((entity.cMesh.camToFacesMag[i] > g.camera.fadeStart)) {
        let startAtZero = entity.cMesh.camToFacesMag[i] - g.camera.fadeStart;
        shrinkBy = 1 - (startAtZero / g.camera.fadeEnd); //1 at start, then 0
        shrinkBy = constrain(shrinkBy, 0, 1);

        v1 = scalarVecMult(shrinkBy, v1);
        v1[3] = wInit;
        v2 = scalarVecMult(shrinkBy, v2);
        v2[3] = wInit;
        v3 = scalarVecMult(shrinkBy, v3);
        v3[3] = wInit;
      }

      if (systemManager.entityHasComponent('cRotUI',entity,)){ //if entity is the UI element....
        //warp meshes so they are attracted to the mouse pointer
        let vArr = [v1,v2,v3];
        let distSum = 0;

        for (let v of vArr){
          let xDiff = g.mouse.x - v[0];
          let yDiff = g.mouse.y - v[1];
          let dist = pythag (xDiff,yDiff);
          distSum+= dist;
          let force = 1/dist;
          v[0] += force * xDiff * g.rotUI.attractionForce;
          v[1] += force * yDiff * g.rotUI.attractionForce;
        }

        if (g.rotUI.drag){ //if currently rotating using the UI brighten the UI
          lightAmount = 1+(1/(distSum/3)*50) + .2;
        } else { //otherwise slightly increase brightness nearer to the mouse
          lightAmount = 1+(1/(distSum/3)*10);
        }
      }

      if (shrinkBy > 0) {

        //if mesh is fading have it turn black
        let r;
        let g;
        let b;
        let a;

        if (entity.cMesh.camToFacesMag[i] > fS){ //if beginning to fade darken shape progressively
          r = entity.cMesh.faceColors[i][0] * Math.pow(shrinkBy, 3) * lightAmount;
          g = entity.cMesh.faceColors[i][1] * Math.pow(shrinkBy, 3) * lightAmount;
          b = entity.cMesh.faceColors[i][2] * Math.pow(shrinkBy, 3) * lightAmount;
          a = entity.cMesh.opacity;
       } else { //otherwise colour according to face color with light (calculating powers are costly)
          r = entity.cMesh.faceColors[i][0] * lightAmount;
          g = entity.cMesh.faceColors[i][1] * lightAmount;
          b = entity.cMesh.faceColors[i][2] * lightAmount;
          a = entity.cMesh.opacity;
        }

        ctx.fillStyle = cssRGBA([r,g,b,a]);
        ctx.strokeStyle = cssRGBA([r,g,b,a]);

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

        ctx.fill();
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

  }

}


class sRotUI extends System { //handles the dragging, position, size and rotation of UI element asides from mesh warping (which occurs in render system)
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cRotUI'];
    body.addEventListener('mousedown',()=>{ //collision detection
      let distToCenter = pythag(g.mouse.x-window.innerWidth/2,g.mouse.y-window.innerHeight/2);
      if (distToCenter < g.rotUI.scale*g.camera.scaleAmount*2.26){
        g.rotUI.drag = true;
        console.log('ahh');
      }
    });
    body.addEventListener('mouseup',()=>{
      g.rotUI.drag = false;
    });
  }

update() {
  //interpolate back into place
  g.rotUI.rotX -= g.rotUI.rotX * g.rotUI.interpolationRate;
  g.rotUI.rotY -= g.rotUI.rotY * g.rotUI.interpolationRate;
  //create rotation matrix based on mouse pos since last click
  if (g.rotUI.drag === true){
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
  if (g.rotUI.drag === true){
    entity.cMesh.scale(g.rotUI.scale);
} else { //scale size
    let d = pythag(g.mouse.x-window.innerWidth/2,g.mouse.y-window.innerHeight/2); //dist to center
    let s = (1/d)*(g.rotUI.scale*600);
    let alpha = (s*38)-2;
    alpha = constrain(alpha,0,1);
    // console.log(s)
    s = constrain(s,0,g.rotUI.scale);
        entity.cMesh.opacity = alpha;
    entity.cMesh.scale(s);
}
  entity.cPos.x = g.camera.x + g.rotUI.xBase;
  entity.cPos.y = g.camera.y + g.rotUI.yBase;
  entity.cPos.z = g.camera.z + g.rotUI.zBase;
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
