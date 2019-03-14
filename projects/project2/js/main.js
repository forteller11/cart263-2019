'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;
let firstEntity;
let globalEntityIdCounter = 0; //everytime an entity is created it is given a unique identifier

function main(){
  console.log('main');
  body = document.getElementById('body');
  globalObj = new Globals();
  console.log(globalObj);
  systemManager = new SystemManager();

  // createEntitiesFromBlueprint(playFieldBlueprint,1);
  // createEntitiesFromBlueprint(headBlueprint,3);

  let xx = 0;
  while (xx < window.innerWidth){
    createEntitiesFromBlueprint(floorBlueprint,1,(e)=>{
      e.cPos.x = xx;
      xx+=e.cHitbox.radius*3;
        e.cPos.y = window.innerHeight/1.1 - e.cHitbox.radius;
    });
  }

  createEntitiesFromBlueprint(embedVideoBlueprint,7);



  // systemManager.removeEntityWithId(0);
  // systemManager.removeEntityWithId(1);
  // systemManager.removeEntityWithId(2);
  setInterval(update, 16.7);

}
