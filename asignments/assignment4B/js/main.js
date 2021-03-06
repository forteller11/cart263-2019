"use strict";

window.onload = main;

let body;
const circlePop = 20;
let circles = [];

const physicsDrag = .98;
const collisionForceTransfer = .8;

let mouseHistMaxLength = 6;
let mouseHistX = [];
let mouseHistY = [];
let mouseDragIndex = null; //index of entity currently dragging
let mouseMoveStoreX;
let mouseMoveStoreY;
let mouseEntityDragOffsetX;
let mouseEntityDragOffsetY;

function main() {
  console.log('main');
  body = document.getElementById('body');

  document.addEventListener('mousedown', (e) => {
    for (let i = 0; i < circles.length; i++) {
      if (mouseCollision(e.clientX, e.clientY, circles[i])) {
        mouseEntityDragOffsetX = circles[i].x - e.clientX;
        mouseEntityDragOffsetY = circles[i].y - e.clientY;
        mouseDragIndex = i;
        circles[mouseDragIndex].drag = true;
        break;
      }
    }
  });

  document.addEventListener('mousemove', (e) => {
    mouseMoveStoreX = e.clientX;
    mouseMoveStoreY = e.clientY;

    if (!(mouseDragIndex === null)) { //move entity if dragging === true
      circles[mouseDragIndex].x = mouseMoveStoreX + mouseEntityDragOffsetX;
      circles[mouseDragIndex].y = mouseMoveStoreY + mouseEntityDragOffsetY;
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (!(mouseDragIndex === null)) {
      let throwComponentX = 0;
      let throwComponentY = 0;
      for (let i = 0; i < mouseHistX.length - 1; i++) {
        const weight = i / (mouseHistMaxLength - 1); //only newest elements have full weight;

        throwComponentX += (mouseHistX[i + 1] - mouseHistX[i]) * weight;
        throwComponentY += (mouseHistY[i + 1] - mouseHistY[i]) * weight;
      }
      throwComponentX = throwComponentX / (mouseHistX.length - 1); //find mean kinda
      throwComponentY = throwComponentY / (mouseHistY.length - 1);

      circles[mouseDragIndex].velocity.x = throwComponentX;
      circles[mouseDragIndex].velocity.y = throwComponentY;

      circles[mouseDragIndex].drag = false;
    }
    mouseDragIndex = null;
  });

  for (let i = 0; i < circlePop; i++) {
    const newCircle = new Food('assets/face1.png');
    circles.push(newCircle);
  }


  setInterval(update, 16.7);
}





function mouseCollision(mouseX, mouseY, e1) {
  //e1 = entity object

  if ((mouseX < e1.x + e1.radius) && (mouseX > e1.x - e1.radius)) {
    if ((mouseY < e1.y + e1.radius) && (mouseY > e1.y - e1.radius)) {
      return true;
    }
  }
  return false;
}

function entityCollision(e1, e2) {
  const collisionDeltaX = e2.x - e1.x;
  const collisionDeltaY = e2.y - e1.y;
  const collisionBetween = new Vector(collisionDeltaX, collisionDeltaY); //vector going from center of e1 to e2

  if (collisionBetween.mag < e1.radius + e2.radius) { //if this is true, then circles are colliding
    const deltaMassE1 = e1.invMass / e2.invMass; //how much more e1 shud be effected then e2
    const deltaMassE2 = e2.invMass / e1.invMass; //how much more e1 shud be effected then e2
    ///dynamic resolution for angles\\\\\
        //transfer rotational energies
        const rotationToBeTransferredPercentage = 0.6;
        const rotationToBeTransferredFromEntity1 = e1.angleVelocity * rotationToBeTransferredPercentage;
        const rotationToBeTransferredFromEntity2 = e2.angleVelocity * rotationToBeTransferredPercentage;

        e1.angleVelocity -= rotationToBeTransferredFromEntity1 * deltaMassE1;
        e2.angleVelocity += rotationToBeTransferredFromEntity1 * deltaMassE2;

        e1.angleVelocity += rotationToBeTransferredFromEntity2 * deltaMassE1;
        e2.angleVelocity -= rotationToBeTransferredFromEntity2 * deltaMassE2;

    //the more at a right angle the velocity to collision vector is the more angular momentum changes
    let deltaVelocityVector = new Vector (e2.velocity.x-e1.velocity.x,e2.velocity.y-e1.velocity.y);
    const momentOfInertia = .0012;
    let deltaBetweenCollisionAndEntity1 = Math.sin(collisionBetween.angle() - e1.velocity.angle());
    let deltaBetweenCollisionAndEntity2 = Math.sin(collisionBetween.angle() - e2.velocity.angle());

    deltaBetweenCollisionAndEntity1 *= momentOfInertia * e1.velocity.mag;
    deltaBetweenCollisionAndEntity2 *= momentOfInertia * e2.velocity.mag;
    //
    e1.angleVelocity += (deltaBetweenCollisionAndEntity1) * deltaMassE1; //if at right angle want maxium angle change
    e2.angleVelocity += (deltaBetweenCollisionAndEntity1) * deltaMassE2; //if at right angle want maxium angle change

    e1.angleVelocity -= (deltaBetweenCollisionAndEntity2) * deltaMassE1; //if at right angle want maxium angle change
    e2.angleVelocity -= (deltaBetweenCollisionAndEntity2) * deltaMassE2; //if at right angle want maxium angle change


    ////////dynamic resolution (Change velocities of balls accordingly)\\\\\\\\\
    let collisionVector = new Vector(collisionBetween.angle(), 1, 'polar'); //normalized vector from e1 to e2;

    //velocity to remove to entity and add to other entity
    let projectedMagEntity1 = dotProduct(e1.velocity, collisionVector);
    let projectedMagEntity2 = dotProduct(e2.velocity, collisionVector);

    //vector with all the x/y velocities going from entity to entity
    let projectedVectorEntity1 = new Vector(collisionBetween.angle(), projectedMagEntity1, 'polar');
    let projectedVectorEntity2 = new Vector(collisionBetween.angle(), projectedMagEntity2, 'polar');

    projectedVectorEntity1.mult(collisionForceTransfer); //shorten vector
    // projectedVectorEntity1.constrainMag(.01); //constrain mag to not be larger
    projectedVectorEntity2.mult(collisionForceTransfer);


    // projectedVectorEntity2.constrainMag(e2.velocity.mag/deltaMassE1); //constrain mag to not be larger

    const angleVelocityContributionToLinear = 10; //how much angle vel effects resultant post collision linear vel
    const momentumToBeTransffered = 1; //percentage force lost on transfer to other entity

    //how much to change resultant forces considering rotation of bodies collided with, can only change by max of 90degrees
    const rotateE1VecBy = constrain(e2.angleVelocity*angleVelocityContributionToLinear,-Math.PI/2,Math.PI/2);
    const rotateE2VecBy = constrain(e1.angleVelocity*angleVelocityContributionToLinear,-Math.PI/2,Math.PI/2);

    //change vectors depending on mass differences
    let c1e1 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);
    c1e1.rotate(rotateE1VecBy);

    let c1e2 = new Vector(projectedVectorEntity1.x, projectedVectorEntity1.y);
    c1e2.rotate(rotateE2VecBy);

    let c2e1 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);
    c2e1.rotate(rotateE1VecBy);

    let c2e2 = new Vector(projectedVectorEntity2.x, projectedVectorEntity2.y);
    c2e2.rotate(rotateE2VecBy);


    if (deltaMassE1 < deltaMassE2){ //if entity one is heavier then e2, make sure e2 only goes as fast as e1
      c1e1.mult(deltaMassE1); // make change in velocity less for e1, while giving 100% of vel to e2 (to make it go as fast as e1)
      c2e1.mult(deltaMassE1 * momentumToBeTransffered); //but also lose some momentum on transfer

      c1e2.mult(momentumToBeTransffered);
    } else {
      c1e2.mult(deltaMassE2 * momentumToBeTransffered);
      c2e2.mult(deltaMassE2);

      c2e1.mult(momentumToBeTransffered);
    }

    e1.velocity.sub(c1e1); //remove all vel going towards other entity
    e2.velocity.add(c1e2); //add that vel to other entity

    e2.velocity.sub(c2e2); //remove all vel going towards other entity
    e1.velocity.add(c2e1); //add that vel to other entity




}


/////////////static resolution\\\\\\\\\\\\\\\\\\\\\\\\\
    //will circles be overlapping next frame?
    const e1NxtX = e1.x + e1.velocity.x; //x on next frame given velocities
    const e1NxtY = e1.y + e1.velocity.y;
    const e2NxtX = e2.x + e2.velocity.x;
    const e2NxtY = e2.y + e2.velocity.y;

    const nxtCollisionDeltaX = e2NxtX - e1NxtX;
    const nxtCollisionDeltaY = e2NxtY - e1NxtY;
    const nxtCollisionBetween = new Vector(collisionDeltaX, collisionDeltaY);

    if (nxtCollisionBetween.mag < e1.radius + e2.radius) { //if overlapping next frame
    //static resolution (make it so circles don't overlap post collision)
    const distOverlapping = e1.radius + e2.radius - collisionBetween.mag;
    collisionBetween.setMag(distOverlapping); //CARFUL because rewriting over vector which dynamic resoltuion needs
    staticResolution(e1,e2,collisionBetween);
  }


}

function staticResolution(e1,e2,collisionBetween){
    e1.x -= collisionBetween.x / 2;
    e2.x += collisionBetween.x / 2;

    e1.y -= collisionBetween.y / 2;
    e2.y += collisionBetween.y / 2;

}
