'use strict';



function createEntitiesFromBlueprint(...args) {
  let blueprintName;
  let numberToCreate;
  switch (args.length) {
    case 1:
      {
        blueprintName = args[0];
        numberToCreate = 1;
        break;
      }
    case 2:
      {
        blueprintName = args[0];
        numberToCreate = args[1];
        break;
      }

    default:
      console.log('wrong number of arguments');
      break;
  }
  if (numberToCreate === 1) { //return entities if only to create one
    return createEntity(blueprintName);
  } else {
    let entities = [];
    for (let i = 0; i < numberToCreate; i++) { //else dont return entities
      entities.push(createEntity(blueprintName));
    }
    return entities;
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
      case 'mesh':
        {
          const rotRange = .1;
          const posRange = 150;
          const velRange = .6;

          newEntity.addComponent(new cPos(0, ran(-posRange,posRange), ran(-posRange,posRange), ran(-posRange,posRange)));
          newEntity.addComponent(new cMesh(ranElementOfArray(meshFileParsedData)));
          newEntity.cMesh.scale(ran(1,8));
          // newEntity.cMesh.faceColor([255,255,255,1]);
          newEntity.addComponent(new cPhysics(2, ran(-velRange,velRange),ran(-velRange,velRange),ran(-velRange,velRange), ran(-rotRange,rotRange),ran(-rotRange,rotRange),ran(-rotRange,rotRange))); //static = true
          break;
        }
        case 'rotationUI':
          {
            newEntity.addComponent(new cPos(0, g.rotUI.xBase, g.rotUI.yBase, g.rotUI.zBase));
              newEntity.cPos.angleX = Math.PI/2;
            newEntity.addComponent(new cMesh(meshFileParsedData[0]));
            newEntity.cMesh.scale(g.rotUI.scale);
            newEntity.cMesh.faceColor(bgColor);
            newEntity.cMesh.shading = false;
            newEntity.addComponent(new cPhysics(0, 0,0,0, 0,0,0)); //static = true

            newEntity.addComponent(new cRotUI());
            break;
          }
        case 'player':
          {
            newEntity.addComponent(new cPos(0,0,0,0));
            newEntity.addComponent(new cPlayer()); //static = true
            break;
          }
    default:
      console.log('Not valid blueprint name!')
      break;
  }
}

function fadeOpacity(self, other) {
  self.cHtmlDisplay.span.style.opacity -= .1;
  if (self.cHtmlDisplay.span.style.opacity < 0) {
    systemManager.removeEntity(self);
  }
}
