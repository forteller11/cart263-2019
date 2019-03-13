'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;
let firstEntity;
function main(){
  console.log('main');
  body = document.getElementById('body');
  globalObj = new Globals();
  console.log(globalObj);
  systemManager = new SystemManager();

  // createEntitiesFromBlueprint(playFieldBlueprint,1);
  // createEntitiesFromBlueprint(headBlueprint,3);
  createEntitiesFromBlueprint(embedVideoBlueprint,4);

  setInterval(update, 16.7);

}
