'use strict';

function headBlueprint() {
  let radius = ran(32, 128);
  const initVel = 10;
  const initRot = .1;
  const mass = 4 / 3 * radius * radius * radius * Math.PI;

  let newHead = new Entity();

  newHead.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth / 2), ran(window.innerHeight)));
  newHead.addComponent(new cHitbox('circle',radius));
  newHead.addComponent(new cPhysics(mass, ran(-initVel, initVel), ran(-initVel, initVel), ran(-initRot, initRot)));
  newHead.addComponent(new cHtmlDisplay('image','assets/face1.png', radius * 2));
  newHead.addComponent(new cDraggable());

systemManager.addEntity(newHead);
return newHead;
}

function embedVideoBlueprint() {
  let radius = ran(64, 256);
  const initVel = 10;
  const initRot = .1;
  let mass = 4 / 3 * radius * radius * radius * Math.PI;
  let randomIndex = ranIndexOfArray(videoIds);

  let newHead = new Entity();
  newHead.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth / 2), ran(window.innerHeight)));
  newHead.addComponent(new cHitbox('circle',radius));
  newHead.addComponent(new cPhysics(mass, ran(-initVel, initVel), ran(-initVel, initVel), ran(-initRot, initRot),false));
  newHead.addComponent(new cHtmlDisplay('embedVideo',videoIds[randomIndex], radius * 2));
  newHead.addComponent(new cDraggable());

systemManager.addEntity(newHead);
return newHead;
}

function floorBlueprint() {
  let radius = 32;
  const initVel = 0;
  const initRot = 0;
  let mass = Number.MAX_SAFE_INTEGER;

  let newHead = new Entity();
  newHead.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth / 2), ran(window.innerHeight)));
  newHead.addComponent(new cHitbox('circle',radius));
  newHead.addComponent(new cPhysics(mass,0,0,0,true)); //static = true
  newHead.addComponent(new cHtmlDisplay('image','assets/youtubeLogo.png', radius*2));
  // newHead.addComponent(new cDraggable());

systemManager.addEntity(newHead);
return newHead;
}

function playFieldBlueprint() {
  let radius = 400;

  let newHead = new Entity();

  newHead.addComponent(new cPos(0, ran(window.innerWidth / 2), ran(window.innerHeight)));
  newHead.addComponent(new cHitbox('rect',radius));
  newHead.addComponent(new cHtmlDisplay('image','assets/rorty.jpg', radius));
  newHead.addComponent(new cDragArea());
systemManager.addEntity(newHead);
return newHead;
}

function createEntitiesFromBlueprint(entityBlueprint, numberToCreate, ...args) {
  //args[0] is a function executed on every entity
  if (args.length === 0){
  for (let i = 0; i < numberToCreate; i++) {
    entityBlueprint();
  }
}
else if (args.length ===1) {
  console.log(args[0]);
  for (let i = 0; i < numberToCreate; i++) {
    args[0](entityBlueprint()); //function call
  }
} else {console.log('wrong number of arguments!');}
}
