'use strict';

function createHead(){
  let newHead = new Entity();

  let newPos = new cPos(ran(Math.PI),window.innerWidth/2,window.innerHeight/2);
  newHead.cPos = newPos;
  newHead.componentNames.push('cPos');

  let radius = ran(32,128);
  let newHitbox = new cHitbox(radius);
  newHead.cHitbox = newHitbox;
  newHead.componentNames.push('cHitbox');

  const initVel = 2;
  let newPhysics = new cPhysics(2*radius*Math.PI*Math.PI,ran(-initVel,initVel),ran(-initVel,initVel));
  newHead.cPhysics = newPhysics;
  newHead.componentNames.push('cPhysics');

  let newImage = new cImage('assets/face1.png',radius*2)
  newHead.cImage = newImage;
  newHead.componentNames.push('cImage');
  return newHead;
  //draggable
}
