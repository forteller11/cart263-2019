'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;
let firstEntity;
function main(){
  body = document.getElementById('body');
  globalObj = new Globals();
  console.log(globalObj);
  systemManager = new SystemManager();

  createEntitiesFromBlueprint(playFieldBlueprint,1);
  createEntitiesFromBlueprint(headBlueprint,3);


  setInterval(update, 16.7);

}
