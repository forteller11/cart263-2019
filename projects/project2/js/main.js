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
  createEntitiesFromBlueprint(embedVideoBlueprint,12);


  // systemManager.removeEntityWithId(0);
  // systemManager.removeEntityWithId(1);
  // systemManager.removeEntityWithId(2);
  setInterval(update, 16.7);

}
