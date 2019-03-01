'use strict';

function headBlueprint(){
  let newHead = new Entity();

  let newPos = new cPos(ran(Math.PI),ran(window.innerWidth/2),ran(window.innerHeight));
  newHead.cPos = newPos;
  newHead.componentNames.push('cPos');

  let radius = ran(32,128);
  let newHitbox = new cHitbox(radius);
  newHead.cHitbox = newHitbox;
  newHead.componentNames.push('cHitbox');

  const initVel = 10;
  const initRot = .1;
  let newPhysics = new cPhysics(4/3*radius*radius*radius*Math.PI,ran(-initVel,initVel),ran(-initVel,initVel),ran(-initRot,initRot));
  newHead.cPhysics = newPhysics;
  newHead.componentNames.push('cPhysics');

  let newImage = new cImage('assets/face1.png',radius*2)
  newHead.cImage = newImage;
  newHead.componentNames.push('cImage');

  let newDraggable = new cDraggable();
  newHead.cDraggable = newDraggable;
  newHead.componentNames.push('cDraggable');
  return newHead;
  //draggable
}

function createEntitiesFromBlueprint(entityBlueprint,numberToCreate){
  for (let i = 0; i < numberToCreate; i ++){
    let newEntity = entityBlueprint();
    systemManager.addEntity(newEntity);
  }
}
