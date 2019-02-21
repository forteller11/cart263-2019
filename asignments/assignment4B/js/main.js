"use strict";

window.onload = main;

let body;
const circlePop = 10;
let circles = [];

const physicsDrag = .98;

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
        console.log('mouseDragIndex='+i);
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

    if (!(mouseDragIndex === null)){ //move entity if dragging === true
      circles[mouseDragIndex].x = mouseMoveStoreX + mouseEntityDragOffsetX;
      circles[mouseDragIndex].y = mouseMoveStoreY + mouseEntityDragOffsetY;
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (!(mouseDragIndex === null)) {
      let throwComponentX = 0;
      let throwComponentY = 0;
      for (let i = 0; i < mouseHistX.length-1; i++) {
        const weight = i / (mouseHistMaxLength-1); //only newest elements have full weight;

        throwComponentX += (mouseHistX[i+1] - mouseHistX[i]) * weight;
        throwComponentY += (mouseHistY[i+1] - mouseHistY[i]) * weight;
      }
      throwComponentX = throwComponentX/(mouseHistMaxLength-1); //find mean kinda
      throwComponentY = throwComponentY/(mouseHistMaxLength-1);

      circles[mouseDragIndex].velocity.x += throwComponentX;
      circles[mouseDragIndex].velocity.y += throwComponentY;

      circles[mouseDragIndex].drag = false;
    }
    mouseDragIndex = null;
  });

  for (let i = 0; i < circlePop; i++) {
    const newCircle = new Entity('assets/face1.png');
    circles.push(newCircle);
  }
  circles[0].x = 0;
  circles[0].velocity.x = 2;
  circles[1].x = 600;

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
  const collisionDistBetween = distFromDelta(collisionDeltaX, collisionDeltaY);
  // console.log('distBetween: '+collisionDistBetween);
  if (collisionDistBetween < e1.radius + e2.radius) { //if this is true, then circles are colliding
    const collisionDistOverlapping = e1.radius + e2.radius - collisionDistBetween;

    //static resolution (make it so circles don't overlap post collision)
    if (e2.x > e1.x) {
      e1.x -= collisionDistOverlapping / 2;
      e2.x += collisionDistOverlapping / 2;
    } else {
      e1.x += collisionDistOverlapping / 2;
      e2.x -= collisionDistOverlapping / 2;
    }

    if (e2.y > e1.y) {
      e1.y -= collisionDistOverlapping / 2;
      e2.y += collisionDistOverlapping / 2;
    } else {
      e1.y += collisionDistOverlapping / 2;
      e2.y -= collisionDistOverlapping / 2;
    }

    //dynamic resolution (Change velocities of balls accordingly)
    const collisionAngle = Math.atan2(collisionDeltaY,collisionDeltaX); //angle from e1-->e2

    let collisionVector = new Vector(collisionAngle,1,'polar'); //normalized vector from e1 to e2;

    let projectedMagEntity1 = dotProduct(e1.velocity,collisionVector);
    let projectedMagEntity2 = dotProduct(e2.velocity,collisionVector);

    //vector with all the x/y velocities going from entity to entity
    let projectedVectorEntity1 = new Vector(collisionAngle,projectedMagEntity1,'polar');
    let projectedVectorEntity2 = new Vector(collisionAngle,projectedMagEntity2,'polar');

    // console.log(collisionVector);
    // console.log(projectedVectorEntity1);
    e1.velocity.sub(projectedVectorEntity1); //remove all vel going towards other entity
    e2.velocity.add(projectedVectorEntity1); //add that vel to other entity

    e2.velocity.sub(projectedVectorEntity2); //remove all vel going towards other entity
    e1.velocity.add(projectedVectorEntity2); //add that vel to other entity

    //for e2 dot will have to be reversed maybe? or not?
  }
}
