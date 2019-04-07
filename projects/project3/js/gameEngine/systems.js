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
      switch (g.input.keysDown[i]) {
        //ROTATIONS
        case 37: //left arrow
          entity.cPos.angleX -= g.camera.rotateSpeed;
          break;
        case 39: //right arrow
          entity.cPos.angleX += g.camera.rotateSpeed;
          break;
        case 38: //up arrow
          entity.cPos.angleY += g.camera.rotateSpeed;
          break;
        case 40: //down arrow
          entity.cPos.angleY -= g.camera.rotateSpeed;
          break;
        case 81: //Q
          entity.cPos.angleZ -= g.camera.rotateSpeed;
          break;
        case 69: //E
          entity.cPos.angleZ += g.camera.rotateSpeed;
          break;
        }
        g.camera.angleX = entity.cPos.angleX;
        g.camera.angleY = entity.cPos.angleY;
        g.camera.angleZ = entity.cPos.angleZ;

        g.camera.rotationMatrix = matMatComp(
          rotMatX(g.camera.angleY),
          rotMatY(g.camera.angleX),
          rotMatZ(g.camera.angleZ));

          let moveForward = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, g.camera.forwardOrientation));
          let moveRight = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, g.camera.rightOrientation));
          let moveUp = scalarVecMult(g.input.moveSpeed, matVecMult(g.camera.rotationMatrix, g.camera.upOrientation));

        switch (g.input.keysDown[i]) {
          //MOVEMENT
        case 65:
          { //a key
            entity.cPos.x -= moveRight[0];
            entity.cPos.y += moveRight[1];
            entity.cPos.z += moveRight[2];
            break;
          }
        case 68:
          { //d key
            entity.cPos.x += moveRight[0];
            entity.cPos.y -= moveRight[1];
            entity.cPos.z -= moveRight[2];
            break;
          }
        case 87:
          { //w key
            entity.cPos.x -= moveForward[0];
            entity.cPos.y -= moveForward[1];
            entity.cPos.z += moveForward[2];

            break;
          }
        case 83:
          { //s key
            entity.cPos.x += moveForward[0];
            entity.cPos.y += moveForward[1];
            entity.cPos.z -= moveForward[2];
            break;
          }
        case 32:
          { //space bar, rotate by ... degrees
            entity.cPos.x += moveUp[0];
            entity.cPos.y -= moveUp[1];
            entity.cPos.z += moveUp[2];
            break;
          }
        case 16:
          { //shift control
            entity.cPos.x -= moveUp[0];
            entity.cPos.y += moveUp[1];
            entity.cPos.z -= moveUp[2];
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

    for (let i = 0; i < this.relevantEntities.length; i++) { //calc distance to camera
        this.relevantEntities[i].cMesh.distToCamera = pythag(
        this.relevantEntities[i].cPos.x-g.camera.x,
        this.relevantEntities[i].cPos.y-g.camera.y,
        this.relevantEntities[i].cPos.z-g.camera.z
      )
    }
    this.sortEntitiesByDistToCamera()
    super.update();
  }
  sortEntitiesByDistToCamera() {
    let e = this.relevantEntities;

    if (e.length > 1) { //only sort if there are more than 2 entities

      for (let i = 1; i < e.length; i++) {
        let j = i - 1;
        while (j >= 0) {

          if (e[j].cMesh.distToCamera < e[i].cMesh.distToCamera) {
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
    //sort
  }

  systemExecution(entity) { //for every mesh, then translate based and around cam

    //create rotation matrix based on entities angular velocity
    let rotationMatXYZ = matMatComp(
      rotMatX(entity.cPhysics.angularVel.x),
      rotMatY(entity.cPhysics.angularVel.y),
      rotMatZ(entity.cPhysics.angularVel.z)
    );

    let worldTransMat1 = transMat(entity.cPos.x, entity.cPos.y, entity.cPos.z); //translates from model to world coordinates
    let preProjectionMat = matMatComp(g.camera.rotationMatrix, worldTransMat1, g.camera.translationMatrix); //precalc camera for better perf
    let postProjectionMat = matMatComp(g.camera.centerMatrix, g.camera.scaleMatrix); //precalc these for better perf

    //rotate verts based on rotation matrix
    for (let i = 0; i < entity.cMesh.verts.length; i++) { //rotate all verts by rotation matrix

      let rotatedVec = matVecMult(rotationMatXYZ, entity.cMesh.verts[i]); //multiply vertex by rotation matrix

    }

    this.sortFacesByDistanceToPoint(entity);

    for (let i = 0; i < entity.cMesh.faces.length; i++) {
// console.table(entity.cMesh.verts);

      let v1Raw = entity.cMesh.verts[entity.cMesh.faces[i][0]].slice();
      let v2Raw = entity.cMesh.verts[entity.cMesh.faces[i][1]].slice();
      let v3Raw = entity.cMesh.verts[entity.cMesh.faces[i][2]].slice();
      console.log(v1Raw);
      console.log(v2Raw);
      console.log(v3Raw);
      //store distance of vectors in d vars
      let d1 = entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][0]];
      let d2 = entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][1]];
      let d3 = entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][2]];

      //compose giant transformation matrices for each vector in order right to left
      let m1 = matMatComp(postProjectionMat, preProjectionMat);
      let m2 = matMatComp(postProjectionMat, preProjectionMat);
      let m3 = matMatComp(postProjectionMat, preProjectionMat);

      //transform vectors using the appropriate matrices
      let v1 = matVecMult(m1, v1Raw);
      let v2 = matVecMult(m2, v2Raw);
      let v3 = matVecMult(m3, v3Raw);
      // console.log('=======COMPOSED__MATRICES==========')
      // console.log(m1);
      // console.log(m2);
      // console.log(m3);
      // console.log('=======VECTORS___TRANSFORMED==========');
      // console.log(v1);
      // console.log(v2);
      // console.log(v3);
      // draw resulting vectors on the screen using the appropriate color of the face



      const faceZAvg = mean(v1[2], v2[2], v3[2]);
      if (faceZAvg > g.camera.clippingThreshold) { //if in front of camera draw, if behind, don't draw
        // const faceZAvg = mean(v1[2],v2[2],v3[2]);
        v1[0] = Math.round(v1[0]);
        v1[1] = Math.round(v1[1]);
        v2[0] = Math.round(v2[0]);
        v2[1] = Math.round(v2[1]);
        v3[0] = Math.round(v3[0]);
        v3[1] = Math.round(v3[1]);
//         console.log(`${v1[0]},${v1[1]},
// ${v2[0]},${v2[1]},
// ${v3[0]},${v3[1]},
// `);
        ctx.fillStyle = cssRGBA(entity.cMesh.faceColors[i])
        ctx.strokeStyle = cssRGBA(entity.cMesh.faceColors[i])
        ctx.beginPath(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.lineTo(v3[0], v3[1]);
        ctx.lineTo(v1[0], v1[1]);
         // ctx.closePath();
        ctx.fill();
        // ctx.stroke();
      }
    }

  }

  distBetweenFacesAndPoint(entity) { //calculate distances between faces and an arbitrary pos/point in 3D space
    //poimesh [x,y,z]

    for (let i = 0; i < entity.cMesh.verts.length; i++) { //calc vertDistoCamera for every vertice

      entity.cMesh.vertsDistToCamera[i] = pythag(
        g.camera.x - entity.cPos.x - entity.cMesh.verts[i][0],
        g.camera.y - entity.cPos.y - entity.cMesh.verts[i][1],
        g.camera.z - entity.cPos.z - entity.cMesh.verts[i][2]
      );

    }
    for (let i = 0; i < entity.cMesh.faces.length; i++) { //find avg dist of every face from camera by avging it's avg vertDistToCamera
      entity.cMesh.facesDistToCamera[i] = mean( //avg all distances which make up every  face
        entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][0]],
        entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][1]],
        entity.cMesh.vertsDistToCamera[entity.cMesh.faces[i][2]]
      );
    }
  }

  sortFacesByDistanceToPoint(entity) {

    this.distBetweenFacesAndPoint(entity); //calc facesDistToCamera

    for (let i = 1; i < entity.cMesh.facesDistToCamera.length; i++) { //sorts from largest to smallest: insertion sort (very quick for  smaller arrays and already heavily sorted arr (linear speed for fully sorted)) (?)
      let j = i - 1;

      while (j >= 0) { //itterate backwards through array until find an element which is smaller then index
        // console.log(`${this.facesDistToCamera[i]} < ${this.facesDistToCamera[j]}`)
        if (entity.cMesh.facesDistToCamera[i] > entity.cMesh.facesDistToCamera[j]) {
          //dist to camera swap
          let fDistStore = entity.cMesh.facesDistToCamera[i];
          entity.cMesh.facesDistToCamera[i] = entity.cMesh.facesDistToCamera[j];
          entity.cMesh.facesDistToCamera[j] = fDistStore;

          //face colors swap
          let fColorStore = entity.cMesh.faceColors[i].slice();
          entity.cMesh.faceColors[i] = entity.cMesh.faceColors[j];
          entity.cMesh.faceColors[j] = fColorStore;

          //faces swap
          let fStore = entity.cMesh.faces[i].slice();
          entity.cMesh.faces[i] = entity.cMesh.faces[j];
          entity.cMesh.faces[j] = fStore;
          break;
        }

        j--;
      }
    }

  }

  vertData(entity, face, vert, component) {
    //finds the element in verts array which corresponds to a
    //given component of a vertex of a face

    const faceIndex = (face) * 3;
    const vertIndex = (vert);

    let componentIndex; //convert string x,y,z to number
    switch (component) {
      case 'x':
        componentIndex = 0;
        break;
      case 'y':
        componentIndex = 1;
        break;
      case 'z':
        componentIndex = 2;
        break;
      default:
        console.log('ERROR: wrong input at method vertComponent');
        break
    }
    if (vert > 2) {
      console.log('ERROR: inputs too large at vertComponent')
    };
    if (component === undefined) {
      console.log('ERROR: not enough arguments!')
    }

    //     console.log(`vertIndexData: ${this.faces[faceIndex + vertIndex]*3}
    // vertData: ${this.verts[this.faces[faceIndex + vertIndex]*3 + componentIndex]}`);
    return entity.cMesh.verts[entity.cMesh.faces[faceIndex + vertIndex] * 3 + componentIndex];
  }

  vertDistData(entity, face, vert) {
    //finds the element in vertDistToCamera array which corresponds to
    //a givens face's vert's dist between vert-camera

    const faceIndex = (face) * 3;
    const vertIndex = (vert);

    if (vert === undefined) {
      console.log('ERROR: not enough arguments!')
    }

    return entity.cMesh.vertsDistToCamera[entity.cMesh.faces[faceIndex + vertIndex]];
  }

}

class sImageTransform extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHtmlDisplay'];
  }

  systemExecution(entity) {
    const angleDegrees = entity.cPos.angle * 180;
    entity.cHtmlDisplay.span.style.transform = 'rotate(' + angleDegrees + 'deg)';

    entity.cHtmlDisplay.span.style.left = (entity.cPos.x - entity.cHtmlDisplay.width / 2) + 'px';
    entity.cHtmlDisplay.span.style.top = (entity.cPos.y - entity.cHtmlDisplay.height / 2) + 'px';
  }

}

class sInput extends System { //handles dragging behavior and transforming the entity being dragged
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);

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
  }
  update() {
    // console.log(g.input.keysDown);
  }
}

class sDrag extends System { //handles dragging behavior and transforming the entity being dragged
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox', 'cDraggable'];

    document.addEventListener('mousedown', (e) => { //n mouse click
      for (let i = 0; i < this.relevantEntities.length; i++) {
        if (this.relevantEntities[i].cDraggable.draggable) {
          if (this.pointCircleOverlap(e.clientX, e.clientY, this.relevantEntities[i])) {
            g.drag.dragOffsetX = this.relevantEntities[i].cPos.x - e.clientX;
            g.drag.dragOffsetY = this.relevantEntities[i].cPos.y - e.clientY;
            g.drag.dragEntityRef = this.relevantEntities[i];
            break;
          }
        }
      }
    });

    document.addEventListener('mousemove', (e) => { //update mouse pos
      g.mouse.x = e.clientX;
      g.mouse.y = e.clientY;
    });

    document.addEventListener('mouseup', (e) => { // on release of mouse
      if (!(g.drag.dragEntityRef === null)) { //if dragging entity
        this.setDragEntityReleaseVelocity(); //set vel of entity
      }
      g.drag.dragEntityRef = null; //stop dragging
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

    if (!(g.drag.dragEntityRef === null)) { //if currently dragging an entity
      if (!(g.drag.dragEntityRef.cDraggable.draggable === true)) { //release if no longer draggable
        if (systemManager.entityHasComponent('cPhysics', g.drag.dragEntityRef)) { //if has physics
          this.setDragEntityReleaseVelocity(); //set release velocity
        }
        g.drag.dragEntityRef = null; //stop dragging
        return;
      }

      if (systemManager.entityHasComponent('cPhysics', g.drag.dragEntityRef)) { //set vel and pos of entity being dragged
        const velX = g.mouse.histX[g.mouse.histX.length - 1] - g.mouse.histX[g.mouse.histX.length - 2];
        const velY = g.mouse.histY[g.mouse.histY.length - 1] - g.mouse.histY[g.mouse.histY.length - 2];
        g.drag.dragEntityRef.cPhysics.vel.x = velX * .75;
        g.drag.dragEntityRef.cPhysics.vel.y = velY * .75;
      }
      //move pos based on mouse pos and offsets
      g.drag.dragEntityRef.cPos.x = g.mouse.x + g.drag.dragOffsetX;
      g.drag.dragEntityRef.cPos.y = g.mouse.y + g.drag.dragOffsetY;
    }

  }

  pointCircleOverlap(mouseX, mouseY, entity) {
    if ((mouseX < entity.cPos.x + entity.cHitbox.radius) && (mouseX > entity.cPos.x - entity.cHitbox.radius)) {
      if ((mouseY < entity.cPos.y + entity.cHitbox.radius) && (mouseY > entity.cPos.y - entity.cHitbox.radius)) {
        return true;
      }
    }
    return false;
  }

  setDragEntityReleaseVelocity() { //calculate velocity to give entity on release
    let throwComponentX = 0;
    let throwComponentY = 0;
    //find recent mouse velocity history (delta in position), average it, and set that number as entity's relase vleocity
    for (let i = 0; i < g.mouse.histX.length - 1; i++) { //find delta between mouseHist
      throwComponentX += (g.mouse.histX[i + 1] - g.mouse.histX[i]);
      throwComponentY += (g.mouse.histY[i + 1] - g.mouse.histY[i]);
    }
    throwComponentX = throwComponentX / (g.mouse.histX.length); //find mean kinda
    throwComponentY = throwComponentY / (g.mouse.histY.length);
    //set velocity
    g.drag.dragEntityRef.cPhysics.vel.x = throwComponentX;
    g.drag.dragEntityRef.cPhysics.vel.y = throwComponentY;
  }
}


class sOverlap extends System { //this system is responsble for checking for collisions and then resolving them if appropriate
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox'];
  }

  systemExecution(e1, e2) {
    //collision between circle:circle
    if (e1.cPhysics && e2.cPhysics) {
      if ((e1.cPhysics.inert) && (e2.cPhysics.inert)) return false; //dont check/resolve collision of two static objects
    }
    if ((e1.cHitbox.type === 'circle') && (e2.cHitbox.type === 'circle')) {
      if (this.circleCircleOverlap(e1, e2)) {
        return true
      };
    }

    //collision between box:box
    if ((e1.cHitbox.type === 'rect') && (e2.cHitbox.type === 'rect')) {
      if (this.boundingBoxBoundingBoxOverlap(e1, e2)) {
        return true
      };
    }

    if ((e1.cHitbox.type === 'rect') && (e2.cHitbox.type === 'circle')) {
      if (this.boxCircleOverlap(e1, e2)) {
        return true
      };
    }

    if ((e1.cHitbox.type === 'circle') && (e2.cHitbox.type === 'rect')) {
      if (this.boxCircleOverlap(e2, e1)) {
        return true
      };
    }

  }

  onCollisionEvent(e1, e2) { //on collision, do ___ depnding on...

    //if entities have doOnOverlap functions execute them and pass other entity as argument
    if (!(e1.cHitbox.doOnOverlap === null)) {
      e1.cHitbox.doOnOverlap(e1, e2);
    }
    if (!(e2.cHitbox.doOnOverlap === null)) {
      e2.cHitbox.doOnOverlap(e2, e1);
    }

    //if entities have physics and have overlapped,
    if (systemManager.entityHasComponent('cPhysics', e1) &&
      (systemManager.entityHasComponent('cPhysics', e2))) {
      systemManager.sCollisionResolution.systemExecution(e1, e2);
      return;
    }

    //change status of draggable
    if (systemManager.entityHasComponent('cDragArea', e1)) {
      if (systemManager.entityHasComponent('cDraggable', e2)) {
        systemManager.sDraggable.systemExecution(e2, e1);
        return;
      }
    }

    if (systemManager.entityHasComponent('cDragArea', e2)) {
      if (systemManager.entityHasComponent('cDraggable', e1)) {
        systemManager.sDraggable.systemExecution(e1, e2);
        return;
      }
    }

  }

  boundingBoxBoundingBoxOverlap(e1, e2) {
    //takes two entities, places a bounding box around them, and checks for collision
    let w1;
    let h1;
    switch (e1.cHitbox.type) {
      case 'circle':
        w1 = e1.cHitbox.radius * 2;
        h1 = e1.cHitbox.radius * 2;
        break;

      case 'rect':
        w1 = e1.cHitbox.width;
        h1 = e1.cHitbox.width;
        break;

      default:
        console.log('e1 not valid type of hitbox');
    }
    let w2;
    let h2;
    switch (e2.cHitbox.type) {
      case 'circle':
        w2 = e2.cHitbox.radius * 2;
        h2 = e2.cHitbox.radius * 2;
        break;

      case 'rect':
        w2 = e2.cHitbox.width;
        h2 = e2.cHitbox.width;
        break;

      default:
        console.log('e2 not valid type of hitbox');
    }

    //bounding box collision check
    if ((e1.cPos.x + w1 / 2 > e2.cPos.x - w2 / 2) && //horz overlap
      (e2.cPos.x + w2 / 2 > e1.cPos.x - w1 / 2)) {
      if ((e1.cPos.y + h1 / 2 > e2.cPos.y - h2 / 2) && //horz overlap
        (e2.cPos.y + h2 / 2 > e1.cPos.y - h1 / 2)) {
        return true;
      }
    }
    return false;
  }

  circleCircleOverlap(e1, e2) {
    // first do bounding box collision (quicker)
    if (this.boundingBoxBoundingBoxOverlap(e1, e2)) {
      //then perform pixel perfect collision using square root (slower)
      const minDistBeforeOverlap = e1.cHitbox.radius + e2.cHitbox.radius;
      if (distBetween(e1.cPos.x, e1.cPos.y, e2.cPos.x, e2.cPos.y) < minDistBeforeOverlap) {
        return true;
      }
    }
    return false;
  }

  circlePointOverlap(e1, ...args) {
    let x2;
    let y2;

    switch (args.length) {
      case 1: //parameters are two entities
        x2 = args[0].cPos.x;
        y2 = args[0].cPos.y;
        break;

      case 2: //paramters are x/y positions
        x2 = args[0];
        y2 = args[1];
        break;

      default:
        console.log('not valid number of argumnets at circlePointOverlap!');
    }

    //first do bounding box collision (quicker)
    if (this.boundingBoxPointOverlap(e1, x2, y2)) {
      //then perform peixel perfect collision using square root
      const minDistBeforeOverlap = e1.cHitbox.radius;
      if (distBetween(e1.cPos.x, e1.cPos.y, x2, y2) < minDistBeforeOverlap) {
        return true;
      }
    }
    return false;
  }


  boundingBoxPointOverlap(e1, ...args) {
    let w;
    let h;
    switch (e1.cHitbox.type) {
      case 'circle':
        w = e1.cHitbox.radius * 2;
        h = e1.cHitbox.radius * 2;
        break;

      case 'rect':
        w = e1.cHitbox.width;
        h = e1.cHitbox.width;
        break;

      default:
        console.log('e1 not valid type of hitbox');
        break;
    }


    //define point
    let e2X;
    let e2Y;
    if (args.length === 1) { //if passed in entity
      e2X = args[0].cPos.x; // FIXME
      e2Y = args[0].cPos.y;
    } else if (args.length === 2) { //if passed in x,y of points directly
      e2X = args[0];
      e2Y = args[1];
    } else {
      console.log('wrong number of arguments!');
    }

    //bounding box collision check
    if ((e1.cPos.x + w / 2 > e2X) && //horz overlap
      (e1.cPos.x - w / 2 < e2X)) {
      if ((e1.cPos.y + h / 2 > e2Y) && //horz overlap
        (e1.cPos.y - h / 2 < e2Y)) {
        return true;
      }
    }
    return false;
  }

  boxCircleOverlap(e1, e2) {

    // //first check if the x/y of the circle is within the box and exit function if true (for performance)
    if ((this.boundingBoxPointOverlap(e1, e2)) || (this.boundingBoxPointOverlap(e2, e1))) {
      console.log('POINT OVERLAPS')
      return true;
    } //else do more computationally expensive test

    //create a outline of points sourronding the axis aligned box and check circle collisions with every point....

    const overlapAccuracy = 1; //higher is more precise
    let collisionPointsX = [];
    let collisionPointsY = [];

    const minDistBetweenPoints = (e2.cHitbox.radius) / overlapAccuracy; //no large thne radius of e2

    //generate enough points that when space evenly they don't exceede max distBetweenPoints
    const pointsPerHorzSide = Math.ceil(e1.cHitbox.width / minDistBetweenPoints) + 2;
    const pointsPerVertSide = Math.ceil(e1.cHitbox.height / minDistBetweenPoints) + 2;

    //how much space between each point
    const spaceBetweenHorz = (e1.cHitbox.width / (pointsPerHorzSide + 0));
    const spaceBetweenVert = (e1.cHitbox.height / (pointsPerVertSide + 0));

    //corners
    const topOfBox = e1.cPos.y - e1.cHitbox.height / 2;
    const botOfBox = e1.cPos.y + e1.cHitbox.height / 2;
    const leftOfBox = e1.cPos.x - e1.cHitbox.width / 2;
    const rightOfBox = e1.cPos.x + e1.cHitbox.width / 2;

    //generate points along box
    let index = 0;
    for (let i = 0; i < pointsPerHorzSide; i++) { //topleft to topright points EXCLUDING topright corner
      collisionPointsX[index] = leftOfBox + i * spaceBetweenHorz;
      collisionPointsY[index] = topOfBox;
      index++;
    }
    for (let i = 0; i <= pointsPerHorzSide; i++) { //botleft to botright corner EXCLUDING botleft corner
      collisionPointsX[index] = leftOfBox + i * spaceBetweenHorz;
      collisionPointsY[index] = botOfBox;
      index++;
    }
    for (let i = 1; i < pointsPerVertSide; i++) { //topleft to botright poitns EXCLUDING topleft corner
      collisionPointsX[index] = leftOfBox;
      collisionPointsY[index] = topOfBox + i * spaceBetweenVert;
      index++;
    }
    for (let i = 0; i < pointsPerVertSide; i++) { //topright to botright points EXCLUDING botright corner
      collisionPointsX[index] = rightOfBox;
      collisionPointsY[index] = topOfBox + i * spaceBetweenVert;
      index++;
    }

    if (debugMode) {
      for (let i = 0; i < collisionPointsX.length; i++) {
        ctx.strokeRect(collisionPointsX[i], collisionPointsY[i], 7, 7);
      }
    }

    //check for circle collision with every point
    for (let i = 0; i < collisionPointsX.length; i++) {
      if (this.circlePointOverlap(e2, collisionPointsX[i], collisionPointsY[i])) {
        return true;
      }
    }

    return false;
  }

  update() { //cycle through all pairs of collidable components (nlogn in big 'O' notation i think)
    for (let i = 0; i < this.relevantEntities.length; i++) {
      for (let j = i + 1; j < this.relevantEntities.length; j++) {
        if (this.systemExecution(this.relevantEntities[i], this.relevantEntities[j])) { //check overlap
          this.onCollisionEvent(this.relevantEntities[i], this.relevantEntities[j]); //do somthing after overlap
        }
      }
    }
  }

}
//subsystem which doesn't have independant tick or relevant entities but is triggered by overlap system
//deals with seperating two physics bodies and applying appropriate linear/angular velocity changes
//to behave in a way one might hopefully consider realistic (or inspired by physics bodies in the outside world)
class sCollisionResolution extends System {
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cPhysics'];
  }

  systemExecution(e1, e2) {
    const meanRestitution = (e1.cPhysics.restitution + e2.cPhysics.restitution) / 2;
    const meanAngularRestitution = meanRestitution * 0.5;

    const collisionDeltaX = e2.cPos.x - e1.cPos.x;
    const collisionDeltaY = e2.cPos.y - e1.cPos.y;
    const collisionBetween = new Vector(collisionDeltaX, collisionDeltaY); //vector going from center of e1 to e2
    const deltaMassE1 = e1.cPhysics.invMass / e2.cPhysics.invMass; //how much more e1 shud be effected then e2
    const deltaMassE2 = e2.cPhysics.invMass / e1.cPhysics.invMass; //how much more e1 shud be effected then e2
    ///dynamic resolution for angles\\\\\


    //////dynamic resolution (Change velocities of balls accordingly)\\\\\\\\\
    let collisionVector = new Vector(collisionBetween.angle(), 1, 'polar'); //normalized vector from e1 to e2;

    //velocity to remove to entity and add to other entity
    let projectedMagEntity1 = e1.cPhysics.vel.projectOnTo(collisionVector);
    let projectedMagEntity2 = e2.cPhysics.vel.projectOnTo(collisionVector);

    //vector with all the x/y velocities going from entity to entity
    let projectedVectorEntity1 = new Vector(collisionBetween.angle(), projectedMagEntity1, 'polar');
    let projectedVectorEntity2 = new Vector(collisionBetween.angle(), projectedMagEntity2, 'polar');

    projectedVectorEntity1.mult(meanRestitution); //shorten vector
    projectedVectorEntity2.mult(meanRestitution);


    //change vectors depending on mass differences
    let c1e1 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);

    let c1e2 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);

    let c2e1 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);

    let c2e2 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);




    if (deltaMassE1 < deltaMassE2) { //if entity one is heavier then e2, make sure e2 only goes as fast as e1
      c1e1.mult(deltaMassE1); // make change in velocity less for e1, while giving 100% of vel to e2 (to make it go as fast as e1)
      c2e1.mult(deltaMassE1 * meanRestitution); //but also lose some momentum on transfer

      c1e2.mult(meanRestitution);
    } else {
      c1e2.mult(deltaMassE2 * meanRestitution);
      c2e2.mult(deltaMassE2);

      c2e1.mult(meanRestitution);


    }

    e1.cPhysics.vel.sub(c1e1); //remove all vel going towards other entity
    e2.cPhysics.vel.add(c1e2); //add that vel to other entity

    e2.cPhysics.vel.sub(c2e2); //remove all vel going towards other entity
    e1.cPhysics.vel.add(c2e1); //add that vel to other entity

    /////////////angular dynamic resolution\\\\\\\\\\\\\\\\\\\\\\\\\
    //make entities roll over eachother pseudo releastically
    //projection of entity velocity with vector parrellel to collision normal
    collisionVector.rotate(90);
    let reverseProjectedMagEntity1 = e1.cPhysics.vel.projectOnTo(collisionVector);
    let reverseProjectedMagEntity2 = e2.cPhysics.vel.projectOnTo(collisionVector);
    let combinedReverseProjectedMag = mean(reverseProjectedMagEntity1, reverseProjectedMagEntity2);

    e1.cPhysics.angularVel.z -= (reverseProjectedMagEntity1) / e1.cHitbox.radius * g.physics.rotationTransferOnCollision; //if at right angle want maxium angle change
    e2.cPhysics.angularVel.z += (reverseProjectedMagEntity2) / e2.cHitbox.radius * g.physics.rotationTransferOnCollision; //if at right angle want maxium angle change

    e1.cPhysics.angularVel.z += (reverseProjectedMagEntity2) / e1.cHitbox.radius * g.physics.rotationTransferOnCollision; //if at right angle want maxium angle change
    e2.cPhysics.angularVel.z -= (reverseProjectedMagEntity1) / e2.cHitbox.radius * g.physics.rotationTransferOnCollision; //if at right angle want maxium angle change


    /////////////static resolution\\\\\\\\\\\\\\\\\\\\\\\\\
    //will circles be overlapping next frame?
    const e1NxtX = e1.cPos.x + e1.cPhysics.vel.x; //x on next frame given velocities
    const e1NxtY = e1.cPos.y + e1.cPhysics.vel.y;
    const e2NxtX = e2.cPos.x + e2.cPhysics.vel.x;
    const e2NxtY = e2.cPos.y + e2.cPhysics.vel.y;

    const nxtCollisionDeltaX = e2NxtX - e1NxtX;
    const nxtCollisionDeltaY = e2NxtY - e1NxtY;
    const nxtCollisionBetween = new Vector(collisionDeltaX, collisionDeltaY);

    if (nxtCollisionBetween.mag < e1.cHitbox.radius + e2.cHitbox.radius) { //if overlapping next frame
      //static resolution (make it so circles don't overlap post collision)
      const distOverlapping = e1.cHitbox.radius + e2.cHitbox.radius - collisionBetween.mag;
      collisionBetween.setMag(distOverlapping); //CARFUL because rewriting over vector which dynamic resoltuion needs
      staticResolution(e1, e2, collisionBetween);
    }

    function staticResolution(e1, e2, collisionBetween) {
      if (e1.cPhysics.inert === e2.cPhysics.inert) { //if both inert, or both not inert, displace evenly
        e1.cPos.x -= collisionBetween.x / 2;
        e2.cPos.x += collisionBetween.x / 2;

        e1.cPos.y -= collisionBetween.y / 2;
        e2.cPos.y += collisionBetween.y / 2;
      } else if (e1.cPhysics.inert === true) { //if e1 inert is true,
        e2.cPos.x += collisionBetween.x;
        e2.cPos.y += collisionBetween.y;
      } else { //if e2 is inert
        e1.cPos.x -= collisionBetween.x;
        e1.cPos.y -= collisionBetween.y;
      }
    }
  }
}


class sDraggable extends System { //subsystem which doesn't have independant tick or relevant entities
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    // this.requiredComponents = ['cPos', 'cDraggable',];
  }

  systemExecution(e1, e2) {
    // console.log(e1.cDraggable);
    e1.cDraggable = e2.cDragArea.value;
    // console.log(e1.cDraggable);
  }
}

class sOutOfBoundsHandler extends System { //determines what to do when embedVideo is out of bounds (open it or delete it)
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredBlueprints = ['embedVideo'];
    this.requiredComponents = [];
  }

  systemExecution() {
    for (let entity of this.relevantEntities) {
      //if center off edge of screen right side fade video, open url in new window, then delete
      if (entity.cPos.x > window.innerWidth) {
        //begin fading video out off edge of screen
        entity.cHtmlDisplay.iframe.style.opacity = mapFromRanges(entity.cPos.x, window.innerWidth, window.innerWidth + entity.cHitbox.radius, 1, 0);
        //if completely off edge of screen
        if (entity.cPos.x > window.innerWidth + entity.cHitbox.radius) {
          const rr = entity.cHitbox.radius * 3;
          const xx = ran(window.innerWidth);
          const yy = entity.cPos.y;
          if (!(debugMode)) {
            window.open(`https://www.youtube.com/watch?v=${entity.cHtmlDisplay.link}`, '_blank', `toolbar=no,scrollbars=no,resizable=no,top=${yy},left=${xx},width=${rr},height=${rr}`);
          }
          systemManager.removeEntity(entity);
        }
      }

      //if center off edge of screen left side fade video and delete
      if (entity.cPos.x < window.innerWidth) {
        //begin fading video out off edge of screen
        entity.cHtmlDisplay.iframe.style.opacity = mapFromRanges(entity.cPos.x, 0, -entity.cHitbox.radius, 1, 0, );
        //if completely off edge of screen
        if (entity.cPos.x < -entity.cHitbox.radius) {
          systemManager.removeEntity(entity);
        }
      }

      //if off bottom of video, fade, then delete
      if (entity.cPos.y > window.innerHeight - entity.cHitbox.radius) {
        //begin fading video out off edge of screen
        entity.cHtmlDisplay.iframe.style.opacity = mapFromRanges(entity.cPos.y,
          window.innerHeight - entity.cHitbox.radius, window.innerHeight + entity.cHitbox.radius, 1, 0, );
        //if completely off edge of screen
        if (entity.cPos.y > window.innerHeight + entity.cHitbox.radius) {
          if (entity.cPos.y > window.innerWidth / 2) {
            if (!(debugMode)) {
              const rr = entity.cHitbox.radius * 3;
              const xx = (entity.cPos.x);
              const yy = ran(window.innerHeight);
              window.open(`https://www.youtube.com/watch?v=${entity.cHtmlDisplay.link}`, '_blank', `toolbar=no,scrollbars=no,resizable=no,top=${yy},left=${xx-rr},width=${rr},height=${rr}`);
            }
          }
          systemManager.removeEntity(entity);
        }
      }
    }
  }
}

class sVideoSpawner extends System { //responsible for spawning new videos
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredBlueprints = ['embedVideo'];
    this.requiredComponents = [];
  }

  systemExecution() {
    let dynamicSpawnRate = mapFromRanges(this.relevantEntities.length, 0, 10, g.spawn.rate * 1, g.spawn.rate / 5);
    const r = ran();
    if (dynamicSpawnRate > r) {
      createEntitiesFromBlueprint('embedVideo');
      if (debugMode) console.log('new Entity SPAWNED from sVideoSpawner');

    }
  }
}
