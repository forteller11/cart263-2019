'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;
let firstEntity;
function main(){
  body = document.getElementById('body');
  globalObj = new Globals();
  systemManager = new SystemManager();

  createEntitiesFromBlueprint(headBlueprint,3);

  setInterval(update, 16.7);




  // let arr = [];
  // for (let i = 0; i < 5; i ++){ //create 2Darray of relevant components
  //   arr[i] = [i];
  // }
  // console.log(arr);
  // arr[0][arr[0].length] = 'pushhh';
  // console.log(arr[3][0]);
  // console.log(arr);

  // const print = mapFromRanges(1,0,10,100,0);
  // console.log(print << 1);
  //
  // console.log(4 % 2);
  //
  // console.log('hashing');
}
