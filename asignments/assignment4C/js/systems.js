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

class sOverlap extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox'];
  }

  systemExecution(e1, e2) {
    // console.log('systemexecution');
    if ((e1.cPos.x + e1.cHitbox.radius > e2.cPos.x - e2.cHitbox.radius) && //horz overlap
      (e2.cPos.x + e2.cHitbox.radius > e1.cPos.x - e1.cHitbox.radius)) {
      if ((e1.cPos.y + e1.cHitbox.radius > e2.cPos.y - e2.cHitbox.radius) && //horz overlap
        (e2.cPos.y + e2.cHitbox.radius > e1.cPos.y - e1.cHitbox.radius)) {
        return true;
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
    const meanRestitution = (e1.cPhysics.restitution+e2.cPhysics.restitution)/2;
    const meanRotationalRestitution = meanRestitution*0.75;

    const collisionDeltaX = e2.cPos.x - e1.cPos.x;
    const collisionDeltaY = e2.cPos.y - e1.cPos.y;
    const collisionBetween = new Vector(collisionDeltaX, collisionDeltaY); //vector going from center of e1 to e2
    const deltaMassE1 = e1.cPhysics.invMass / e2.cPhysics.invMass; //how much more e1 shud be effected then e2
    const deltaMassE2 = e2.cPhysics.invMass / e1.cPhysics.invMass; //how much more e1 shud be effected then e2
    ///dynamic resolution for angles\\\\\

    const rotationToBeTransferredFromEntity1 = e1.cPhysics.angularVel * meanRotationalRestitution;
    const rotationToBeTransferredFromEntity2 = e2.cPhysics.angularVel * meanRotationalRestitution;
//
    e1.cPhysics.angularVel -= rotationToBeTransferredFromEntity1 * deltaMassE1;
    e2.cPhysics.angularVel += rotationToBeTransferredFromEntity1 * deltaMassE2;

    e1.cPhysics.angularVel += rotationToBeTransferredFromEntity2 * deltaMassE1;
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
