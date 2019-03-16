'use strict';



function createEntitiesFromBlueprint(...args) {
  let blueprintName;
  let numberToCreate;
  switch (args.length){
    case 1:{
    blueprintName = args[0];
    numberToCreate = 1;
    break;
  }
    case 2:{
    blueprintName = args[0];
    numberToCreate = args[1];
    break;
  }
  case 3:{
    //same as case 2 but execute a function arg3 on entity
  }
    default:
    console.log('wrong number of arguments');
    break;
  }
  if (numberToCreate === 1){ //return entities if only to create one
    return createEntity(blueprintName);
  } else {
    for (let i = 0; i < numberToCreate; i++) { //else dont return entities
      createEntity(blueprintName);
    }
  }
}

function createEntity(blueprintName) {
  let newEntity = new Entity(blueprintName);
  addComponentsBasedOnBlueprint(newEntity, blueprintName);
  systemManager.addEntity(newEntity);
  return newEntity;
}

function addComponentsBasedOnBlueprint(newEntity, blueprintName) {
  switch (blueprintName) {
    case 'embedVideo':{
      let radius = ran(window.innerWidth/24,window.innerWidth/6);
      const initVel = 5;
      const initRot = .1;
      let mass = 4 / 3 * radius * radius * radius * Math.PI;
      let randomIndex = ranIndexOfArray(videoIds);
      newEntity.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth*.33,window.innerWidth *.66), ran(-window.innerHeight*3)));
      newEntity.addComponent(new cHitbox('circle', radius));
      newEntity.addComponent(new cPhysics(mass, ran(-initVel, initVel), ran(-initVel, initVel), ran(-initRot, initRot), false));
      newEntity.addComponent(new cHtmlDisplay('embedVideo', videoIds[randomIndex], radius * 2));
      newEntity.addComponent(new cDraggable());
      break;
}
    case 'playfield': {
      let width = 64;
      let height = window.innerHeight;
      newEntity.addComponent(new cPos(0, ran(window.innerWidth / 2), ran(window.innerHeight)));
      newEntity.addComponent(new cHitbox('rect', width, height));
      newEntity.addComponent(new cHtmlDisplay('image', 'assets/rorty.jpg', width, height));
      // newEntity.addComponent(new cDragArea());
      break;
}
    case 'floor':{
      let radius = window.innerWidth/48;
      const initVel = 0;
      const initRot = 0;
      let mass = Number.MAX_SAFE_INTEGER;
      newEntity.addComponent(new cPos(ran(Math.PI), ran(window.innerWidth / 2), ran(window.innerHeight)));
      newEntity.addComponent(new cHitbox('circle', radius));
      newEntity.addComponent(new cPhysics(mass, 0, 0, 0, true)); //static = true
      newEntity.addComponent(new cHtmlDisplay('image', 'assets/youtubeLogo.png', radius * 2));
      break;
}
    default:
      console.log('Not valid blueprint name!')
      break;
  }
}
