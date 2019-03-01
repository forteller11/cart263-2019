'use strict';

window.onload = main;
let body;
let globalObj;
let systemManager;

function main(){
  body = document.getElementById('body');
  globalObj = new Globals();
  systemManager = new SystemManager();

  let newHead = createHead();
  systemManager.addEntity(newHead);



  // let arr = [];
  // for (let i = 0; i < 5; i ++){ //create 2Darray of relevant components
  //   arr[i] = [];
  // }
  // console.log(arr);
  // arr[0][arr[0].length] = 'pushhh';
  // // arr[0][arr[0].length] = 'pushhh';
  // console.log(arr);
  // const print = mapFromRanges(1,0,10,100,0);
  // console.log(print << 1);
  //
  // console.log(4 % 2);
  //
  // console.log('hashing');
}

function createHead(){
  let newHead = new Entity();
  newHead.components.push(new cPos(ran(Math.Pi)));
  let radius = ran(16,128);
  newHead.components.push(new cHitbox(radius));
  newHead.components.push(new cPhysics());
  newHead.components.push(new cImage('assets/face1.png',radius*2));
  return newHead;
  //draggable
}
