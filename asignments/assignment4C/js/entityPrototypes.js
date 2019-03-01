'use strict';

function createHead(){
  let newHead = new Entity();

  let newPos = new cPos(ran(Math.PI));
  newHead.cPos = newPos;
  newHead.components.push(newPos);

  let radius = ran(16,128);
  let newHitbox = new cHitbox(radius);
  newHead.cHitbox = newHitbox;
  newHead.components.push(newHitbox);

  let newPhysics = new cPhysics(2*radius*Math.PI*Math.PI);
  newHead.cPhysics = newPhysics;
  newHead.components.push(newPhysics);

  let newImage = new cImage('assets/face1.png',radius*2)
  newHead.cImage = newImage;
  newHead.components.push(newImage);
  return newHead;
  //draggable
}
