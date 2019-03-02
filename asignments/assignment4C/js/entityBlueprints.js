'use strict';

function headBlueprint() {
  let radius = ran(32, 128);
  const initVel = 10;
  const initRot = .1;
  const mass = 4 / 3 * radius * radius * radius * Math.PI;

  let newHead = new Entity();

  newHead.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth / 2), ran(window.innerHeight)));
  newHead.addComponent(new cHitbox(radius));
  newHead.addComponent(new cPhysics(mass, ran(-initVel, initVel), ran(-initVel, initVel), ran(-initRot, initRot)));
  newHead.addComponent(new cImage('assets/face1.png', radius * 2));
  newHead.addComponent(new cDraggable());

  return newHead;
}

function createEntitiesFromBlueprint(entityBlueprint, numberToCreate) {
  for (let i = 0; i < numberToCreate; i++) {
    let newEntity = entityBlueprint();
    systemManager.addEntity(newEntity);
  }
}
