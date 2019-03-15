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
    if (debugMode) {
      canvasCtx.strokeStyle = "#5cc639";
      canvasCtx.strokeRect(entity.cPos.x, entity.cPos.y, 2, 2);
    }
    entity.cPos.angle += entity.cPhysics.angularVel;
    entity.cPhysics.angularVel *= globalObj.physics.polarDrag;
    entity.cPhysics.angularVel = constrain(entity.cPhysics.angularVel, -globalObj.physics.maxPolarVel, globalObj.physics.maxPolarVel);
    if (entity.cPhysics.inert) { //if a inert entity
      entity.cPhysics.x = 0;
      entity.cPhysics.y = 0;
      // entity.cPhysics.angularVel = 0;

    } else {
      //apply wind
      entity.cPhysics.vel.x += globalObj.physics.windX;
      entity.cPhysics.vel.y += globalObj.physics.windY;

      //transform position based on velocties
      entity.cPos.x += entity.cPhysics.vel.x;
      entity.cPos.y += entity.cPhysics.vel.y;

      //apply drag and constrain velocties
      entity.cPhysics.vel.mult(globalObj.physics.cartesianDrag);
    }
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


class sDrag extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox', 'cDraggable'];

    document.addEventListener('mousedown', (e) => {
      for (let i = 0; i < this.relevantEntities.length; i++) {
        if (this.relevantEntities[i].cDraggable.draggable) {
          if (this.pointCircleOverlap(e.clientX, e.clientY, this.relevantEntities[i])) {
            globalObj.drag.dragOffsetX = this.relevantEntities[i].cPos.x - e.clientX;
            globalObj.drag.dragOffsetY = this.relevantEntities[i].cPos.y - e.clientY;
            globalObj.drag.dragEntityRef = this.relevantEntities[i];
            break;
          }
        }
      }
    });

    document.addEventListener('mousemove', (e) => {
      globalObj.mouse.x = e.clientX; //update mouse pos
      globalObj.mouse.y = e.clientY;
    });

    document.addEventListener('mouseup', (e) => { //calculate
      if (!(globalObj.drag.dragEntityRef === null)) {
        this.setDragEntityReleaseVelocity();
      }
      globalObj.drag.dragEntityRef = null; //stop dragging
    });

  } //END OF CONSTRUCTOR

  update() {
    if (globalObj.mouse.histX.length < globalObj.mouse.histMaxLength) { //store mouse positions every frame
      globalObj.mouse.histX.push(globalObj.mouse.x);
      globalObj.mouse.histY.push(globalObj.mouse.y);
    } else { //remove oldest, add newest pos
      globalObj.mouse.histX.splice(0, 1);
      globalObj.mouse.histY.splice(0, 1);
      globalObj.mouse.histX.push(globalObj.mouse.x);
      globalObj.mouse.histY.push(globalObj.mouse.y);
    }

    if (!(globalObj.drag.dragEntityRef === null)) {
      if (!(globalObj.drag.dragEntityRef.cDraggable.draggable === true)) { //release if not draggable
        if (systemManager.entityHasComponent('cPhysics', globalObj.drag.dragEntityRef)) {
          this.setDragEntityReleaseVelocity();
        }
        globalObj.drag.dragEntityRef = null; //stop dragging
        return;
      }

      if (systemManager.entityHasComponent('cPhysics', globalObj.drag.dragEntityRef)) { //set vel and pos of entity being dragged
        const velX = globalObj.mouse.histX[globalObj.mouse.histX.length - 1] - globalObj.mouse.histX[globalObj.mouse.histX.length - 2];
        const velY = globalObj.mouse.histY[globalObj.mouse.histY.length - 1] - globalObj.mouse.histY[globalObj.mouse.histY.length - 2];
        globalObj.drag.dragEntityRef.cPhysics.vel.x = velX * .75;
        globalObj.drag.dragEntityRef.cPhysics.vel.y = velY * .75;
      }
      //move pos based on mouse pos and offsets
      globalObj.drag.dragEntityRef.cPos.x = globalObj.mouse.x + globalObj.drag.dragOffsetX;
      globalObj.drag.dragEntityRef.cPos.y = globalObj.mouse.y + globalObj.drag.dragOffsetY;
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
    for (let i = 0; i < globalObj.mouse.histX.length - 1; i++) { //find delta between mouseHist
      // const weight = i / (globalObj.mouse.histMaxLength); //most recent histories have full delta weight;
      throwComponentX += (globalObj.mouse.histX[i + 1] - globalObj.mouse.histX[i]);
      throwComponentY += (globalObj.mouse.histY[i + 1] - globalObj.mouse.histY[i]);
    }
    throwComponentX = throwComponentX / (globalObj.mouse.histX.length); //find mean kinda
    throwComponentY = throwComponentY / (globalObj.mouse.histY.length);
    globalObj.drag.dragEntityRef.cPhysics.vel.x = throwComponentX;
    globalObj.drag.dragEntityRef.cPhysics.vel.y = throwComponentY;
  }
}


class sOverlap extends System { //transforms image to entity position
  constructor(arrayOfRelevantEntities) {
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos', 'cHitbox'];
  }

  systemExecution(e1, e2) {
    //collision between circle:circle
    if ((e1.cHitbox.type === 'circle') && (e2.cHitbox.type === 'circle')) {
      if (this.circleCircleOverlap(e1, e2)) {
        return true
      };
    }

    //collision between box:box
    if ((e1.cHitbox.type === 'rect') && (e2.cHitbox.type === 'rect')) {
      if (this.boundingBoxBoundingBox(e1, e2)) {
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

  boundingBoxBoundingBoxOverlap(e1, e2) {
    //takes two entities, places a bounding box around them, and checks for collision

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
    }

    //bounding box collision check
    if ((e1.cPos.x + w / 2 > e2.cPos.x - w / 2) && //horz overlap
      (e2.cPos.x + w / 2 > e1.cPos.x - w / 2)) {
      if ((e1.cPos.y + h / 2 > e2.cPos.y - h / 2) && //horz overlap
        (e2.cPos.y + h / 2 > e1.cPos.y - h / 2)) {
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

    //
    const overlapAccuracy = 1; //higher is more precise
    let arrayOfCollisionPointsX = [];
    let arrayOfCollisionPointsY = [];

    const minDistBetweenPoints = (e2.cHitbox.radius) / overlapAccuracy; //no large thne radius of e2
    //generate enough points that when space evenly they don't exceede max distBetweenPoints
    const pointsPerHorzSide = Math.ceil(e1.cHitbox.width  / minDistBetweenPoints);
    const pointsPerVertSide = Math.ceil(e1.cHitbox.height / minDistBetweenPoints);
    const evenSpaceBetweenPoints = ((e2.cHitbox.radius * 2) + (e2.cHitbox.radius * 2)) / (pointsPerHorzSide + pointsPerVertSide);

    const spaceBetweenHorz = ((pointsPerHorzSide+1)/e1.width);
    const spaceBetweenVert = ((pointsPerVertSide+1)/e1.height);

    const topOfBox = e1.cPos.y - e1.cHitbox.height;
    const botOfBox = e1.cPos.y + e1.cHitbox.height;
    const leftOfBox = e1.cPos.x - e1.cHitbox.width;
    const rightOfBox = e1.cPos.x + e1.cHitbox.width;


    //4 corners manually give points
    arrayOfCollisionPointsX[0] = leftOfBox;
    arrayOfCollisionPointsY[0] = topOfBox;

    arrayOfCollisionPointsX[1] = rightOfBox;
    arrayOfCollisionPointsY[1] = topOfBox;

    arrayOfCollisionPointsX[2] = rightOfBox;
    arrayOfCollisionPointsY[2] = botOfBox;

    arrayOfCollisionPointsX[3] = leftOfBox;
    arrayOfCollisionPointsY[3] = botOfBox;
    console.log(`vertside ${evenSpaceBetweenPoints}`);
    let index = 4.5;
    let itterations = 0;
    for (let i = index; i < pointsPerVertSide+index; i++) {
      //points from top-left of box to bot-left
      arrayOfCollisionPointsX[index] = leftOfBox;
      arrayOfCollisionPointsY[index] = topOfBox + (i * evenSpaceBetweenPoints);
      itterations++;
    }
    index+=itterations;
    itterations = 0;

    for (let i = index; i < pointsPerVertSide+index; i++) {
      //points from bot-right to bot-top of box
      arrayOfCollisionPointsX[index] = rightOfBox;
      arrayOfCollisionPointsY[index] = botOfBox - (i * evenSpaceBetweenPoints);
      itterations++;
    }
    index+=itterations;
    itterations = 0;

    for (let i = index; i < pointsPerHorzSide+index; i++) {
      //points from bot-left of box to bot-right
      arrayOfCollisionPointsX[index] = leftOfBox + (i * evenSpaceBetweenPoints);
      arrayOfCollisionPointsY[index] = botOfBox;
      itterations++;
    }
    index+=itterations;
    itterations = 0;

    for (let i = 0; i < pointsPerHorzSide+index; i++) {
      //topright to topleft
      arrayOfCollisionPointsX[index] = rightOfBox - (i * evenSpaceBetweenPoints);
      arrayOfCollisionPointsY[index] = topOfBox;
      itterations++;
    }

    console.log(arrayOfCollisionPointsX);
    console.log(arrayOfCollisionPointsY);
    if (debugMode) {
      canvasCtx.strokeStyle = "#3984c6";

      for (let i = 0; i < arrayOfCollisionPointsX.length; i++) {
        canvasCtx.strokeRect(arrayOfCollisionPointsX[i], arrayOfCollisionPointsY[i], 2, 2);

      }
    }


    for (let i = 0; i < arrayOfCollisionPointsX.length; i++) {
      if (this.circlePointOverlap(e2, arrayOfCollisionPointsX[i], arrayOfCollisionPointsY[i])) {
        console.log('TRUE');
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

class sCollisionResolution extends System { //subsystem which doesn't have independant tick or relevant entities but is triggered by overlap system
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

    e1.cPhysics.angularVel -= (reverseProjectedMagEntity1) / e1.cHitbox.radius * globalObj.physics.rotationTransferOnCollision; //if at right angle want maxium angle change
    e2.cPhysics.angularVel += (reverseProjectedMagEntity2) / e2.cHitbox.radius * globalObj.physics.rotationTransferOnCollision; //if at right angle want maxium angle change

    e1.cPhysics.angularVel += (reverseProjectedMagEntity2) / e1.cHitbox.radius * globalObj.physics.rotationTransferOnCollision; //if at right angle want maxium angle change
    e2.cPhysics.angularVel -= (reverseProjectedMagEntity1) / e2.cHitbox.radius * globalObj.physics.rotationTransferOnCollision; //if at right angle want maxium angle change


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
