'use strict';
class System { //base functionality for all systems
  constructor(arrayOfRelevantEntities) {
    this.relevantEntities = []; //array of relevant entities to system
    this.requiredComponents = []; //array of relevant components
  }

  systemExecution(entity) {
    console.log('overide this method for useful system');
  }

  update() {
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
    //generalize to 3 dimensions
    //apply drag and constrain velocties
    entity.cPhysics.vel.mult(globalObj.physics.cartesianDrag);
    entity.cPhysics.angularVel *= globalObj.physics.polarDrag;
    entity.cPhysics.angularVel = constrain(entity.cPhysics.angularVel, -globalObj.physics.maxPolarVel, globalObj.physics.maxPolarVel);
    entity.cPos.angle += entity.cPhysics.angularVel;

    //transform position based on velocties
    entity.cPos.x += entity.cPhysics.vel.x;
    entity.cPos.y += entity.cPhysics.vel.y;
    entity.cPos.angle += entity.cPhysics.angularVel;
  }

}


class sImageTransform extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cImage'];
  }

  systemExecution(entity) {
    const angleDegrees = entity.cPos.angle * 180;
    entity.cImage.image.style.transform = 'rotate(' + angleDegrees + 'deg)';

    entity.cImage.image.style.left = (entity.cPos.x - entity.cImage.image.width / 2) + 'px';
    entity.cImage.image.style.top = (entity.cPos.y - entity.cImage.image.height / 2) + 'px';
  }

}


class sDrag extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox', 'cDraggable'];

    document.addEventListener('mousedown', (e) => {
      for (let i = 0; i < this.relevantEntities.length; i++) {
        if (this.relevantEntities[i].cDraggable.draggable) {
          if (this.pointCircleOverlap(e.clientX, e.clientY, this.relevantEntities[i])) {
            globalObj.dragData.dragOffsetX = this.relevantEntities[i].cPos.x - e.clientX;
            globalObj.dragData.dragOffsetY = this.relevantEntities[i].cPos.y - e.clientY;
            globalObj.dragData.dragEntityRef = this.relevantEntities[i];
            break;
          }
        }
      }
    });

    document.addEventListener('mousemove', (e) => {
      globalObj.dragData.mouseX = e.clientX; //update mouse pos
      globalObj.dragData.mouseY = e.clientY;
    });

    document.addEventListener('mouseup', (e) => { //calculate
      if (!(globalObj.dragData.dragEntityRef === null)) {
        this.setDragEntityReleaseVelocity();
      }
      globalObj.dragData.dragEntityRef = null; //stop dragging
    });

  } //END OF CONSTRUCTOR

  update() {
    if (globalObj.dragData.mouseHistX.length < globalObj.dragData.mouseHistMaxLength) { //store mouse positions every frame
      globalObj.dragData.mouseHistX.push(globalObj.dragData.mouseX);
      globalObj.dragData.mouseHistY.push(globalObj.dragData.mouseY);
    } else { //remove oldest, add newest pos
      globalObj.dragData.mouseHistX.splice(0, 1);
      globalObj.dragData.mouseHistY.splice(0, 1);
      globalObj.dragData.mouseHistX.push(globalObj.dragData.mouseX);
      globalObj.dragData.mouseHistY.push(globalObj.dragData.mouseY);
    }

    if (!(globalObj.dragData.dragEntityRef === null)) { //stop dragging if draggable becomes false
      if (globalObj.dragData.dragEntityRef.cDraggable.draggable === false) { //if during update entity becomes undraggable...
        if (systemManager.entityHasComponent('cPhysics', globalObj.dragData.dragEntityRef)) {
          this.setDragEntityReleaseVelocity();
        }
        globalObj.dragData.dragEntityRef = null; //stop dragging
      }
    }

    if (!(globalObj.dragData.dragEntityRef === null)) { //set vel and pos of entity being dragged
      if (systemManager.entityHasComponent('cPhysics', globalObj.dragData.dragEntityRef)) {
        const velX = globalObj.dragData.mouseHistX[globalObj.dragData.mouseHistX.length - 1] - globalObj.dragData.mouseHistX[globalObj.dragData.mouseHistX.length - 2];
        const velY = globalObj.dragData.mouseHistY[globalObj.dragData.mouseHistY.length - 1] - globalObj.dragData.mouseHistY[globalObj.dragData.mouseHistY.length - 2];
        globalObj.dragData.dragEntityRef.cPhysics.vel.x = velX * .75;
        globalObj.dragData.dragEntityRef.cPhysics.vel.y = velY * .75;
      }
      //move pos based on mouse pos and offsets
      globalObj.dragData.dragEntityRef.cPos.x = globalObj.dragData.mouseX + globalObj.dragData.dragOffsetX;
      globalObj.dragData.dragEntityRef.cPos.y = globalObj.dragData.mouseY + globalObj.dragData.dragOffsetY;
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
  setDragEntityReleaseVelocity() {
    let throwComponentX = 0;
    let throwComponentY = 0;
    for (let i = 0; i < globalObj.dragData.mouseHistX.length - 1; i++) { //find delta between mouseHist
      const weight = i / (globalObj.dragData.mouseHistMaxLength - 1); //most recent histories have full delta weight;
      throwComponentX += (globalObj.dragData.mouseHistX[i + 1] - globalObj.dragData.mouseHistX[i]) * weight;
      throwComponentY += (globalObj.dragData.mouseHistY[i + 1] - globalObj.dragData.mouseHistY[i]) * weight;
    }
    throwComponentX = throwComponentX / (globalObj.dragData.mouseHistX.length - 1); //find mean kinda
    throwComponentY = throwComponentY / (globalObj.dragData.mouseHistY.length - 1);
    globalObj.dragData.dragEntityRef.cPhysics.vel.x = throwComponentX;
    globalObj.dragData.dragEntityRef.cPhysics.vel.y = throwComponentY;
  }
}


class sOverlap extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox'];
  }

  systemExecution(e1, e2) {
    // first do bounding box collision (quicker)
    if ((e1.cPos.x + e1.cHitbox.radius > e2.cPos.x - e2.cHitbox.radius) && //horz overlap
      (e2.cPos.x + e2.cHitbox.radius > e1.cPos.x - e1.cHitbox.radius)) {
      if ((e1.cPos.y + e1.cHitbox.radius > e2.cPos.y - e2.cHitbox.radius) && //horz overlap
        (e2.cPos.y + e2.cHitbox.radius > e1.cPos.y - e1.cHitbox.radius)) {

        //then perform pixel perfect collision using square root (slower)
        const minDistBeforeOverlap = e1.cHitbox.radius + e2.cHitbox.radius;
        if (distBetween(e1.cPos.x, e1.cPos.y, e2.cPos.x, e2.cPos.y) < minDistBeforeOverlap) {
          return true;
        }
      }
    }
    return false;

  }

  update() { //cycle through all pairs of collidable components,
    for (let i = 0; i < this.relevantEntities.length; i++) {
      for (let j = i + 1; j < this.relevantEntities.length; j++) {
        if (this.systemExecution(this.relevantEntities[i], this.relevantEntities[j])) { //check overlap
          onCollisionEvent(this.relevantEntities[i], this.relevantEntities[j]); //propogate event
        }
      }
    }
    //cycle through all relevant entities
  }

}

class sCollisionResolution extends System { //subsystem which doesn't have independant tick or relevant entities
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

    const rotationToBeTransferredFromEntity1 = e1.cPhysics.angularVel * globalObj.physics.rotationTransferOnCollision;
    const rotationToBeTransferredFromEntity2 = e2.cPhysics.angularVel * globalObj.physics.rotationTransferOnCollision;
    //
    e1.cPhysics.angularVel -= rotationToBeTransferredFromEntity1 * deltaMassE1;
    e2.cPhysics.angularVel += rotationToBeTransferredFromEntity1 * deltaMassE2 * meanAngularRestitution;

    e1.cPhysics.angularVel += rotationToBeTransferredFromEntity2 * deltaMassE1 * meanAngularRestitution;
    e2.cPhysics.angularVel -= rotationToBeTransferredFromEntity2 * deltaMassE2;

    //the more at a right angle the velocity to collision vector is the more angular momentum changes
    let deltaVelocityVector = new Vector(e2.cPhysics.vel.x - e1.cPhysics.vel.x, e2.cPhysics.vel.y - e1.cPhysics.vel.y);
    let deltaBetweenCollisionAndEntity1 = Math.sin(collisionBetween.angle() - e1.cPhysics.vel.angle());
    let deltaBetweenCollisionAndEntity2 = Math.sin(collisionBetween.angle() - e2.cPhysics.vel.angle());

    deltaBetweenCollisionAndEntity1 *= e1.cPhysics.momentOfInertia * e1.cPhysics.vel.mag;
    deltaBetweenCollisionAndEntity2 *= e2.cPhysics.momentOfInertia * e2.cPhysics.vel.mag;
    //
    e1.cPhysics.angularVel += (deltaBetweenCollisionAndEntity1) * deltaMassE1; //if at right angle want maxium angle change
    e2.cPhysics.angularVel += (deltaBetweenCollisionAndEntity1) * deltaMassE2; //if at right angle want maxium angle change

    e1.cPhysics.angularVel -= (deltaBetweenCollisionAndEntity2) * deltaMassE1; //if at right angle want maxium angle change
    e2.cPhysics.angularVel -= (deltaBetweenCollisionAndEntity2) * deltaMassE2; //if at right angle want maxium angle change


    //////dynamic resolution (Change velocities of balls accordingly)\\\\\\\\\
    let collisionVector = new Vector(collisionBetween.angle(), 1, 'polar'); //normalized vector from e1 to e2;

    //velocity to remove to entity and add to other entity
    let projectedMagEntity1 = dotProduct(e1.cPhysics.vel, collisionVector);
    let projectedMagEntity2 = dotProduct(e2.cPhysics.vel, collisionVector);

    //vector with all the x/y velocities going from entity to entity
    let projectedVectorEntity1 = new Vector(collisionBetween.angle(), projectedMagEntity1, 'polar');
    let projectedVectorEntity2 = new Vector(collisionBetween.angle(), projectedMagEntity2, 'polar');

    projectedVectorEntity1.mult(meanRestitution); //shorten vector
    projectedVectorEntity2.mult(meanRestitution);

    //how much to change resultant forces considering rotation of bodies collided with, can only change by max of 90degrees
    const rotateE1VecBy = constrain(e2.cPhysics.angularVel * globalObj.physics.angularVelEffectOnLinear, -Math.PI / 2, Math.PI / 2);
    const rotateE2VecBy = constrain(e1.cPhysics.angularVel * globalObj.physics.angularVelEffectOnLinear, -Math.PI / 2, Math.PI / 2);

    //change vectors depending on mass differences
    let c1e1 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);
    c1e1.rotate(rotateE1VecBy);

    let c1e2 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);
    c1e2.rotate(rotateE2VecBy);

    let c2e1 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);
    c2e1.rotate(rotateE1VecBy);

    let c2e2 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);
    c2e2.rotate(rotateE2VecBy);


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
      e1.cPos.x -= collisionBetween.x / 2;
      e2.cPos.x += collisionBetween.x / 2;

      e1.cPos.y -= collisionBetween.y / 2;
      e2.cPos.y += collisionBetween.y / 2;

    }
  }

}


//class dragEvents (stores mouse info), class dragble (tells it can be dragged, stores offsets)
//sDrag requires dragEvents, dragable, pos, physics, tests collision,

//collision system, static/dynamic resolution ssytems... draggable, component which stores drag events


// class handleSprites(){} for food entity and animations
