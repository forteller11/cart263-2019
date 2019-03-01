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

  const initVel = 20;
  const initRot = .2;
  let newPhysics = new cPhysics(2*radius*Math.PI*Math.PI,ran(-initVel,initVel),ran(-initVel,initVel),ran(-initRot,initRot));
  newHead.cPhysics = newPhysics;
  newHead.componentNames.push('cPhysics');

  let newImage = new cImage('assets/face1.png',radius*2)
  newHead.cImage = newImage;
  newHead.componentNames.push('cImage');
  return newHead;
  //draggable
}

function createEntitiesFromBlueprint(entityBlueprint,numberToCreate){
  for (let i = 0; i < numberToCreate; i ++){
    let newEntity = entityBlueprint();
    systemManager.addEntity(newEntity);
  }
}
