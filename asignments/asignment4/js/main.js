"use strict";

window.onload = main;
let fly;
let mouth;
let body = [];

function main(){
  console.log("main");
  body = document.getElementsByTagName('body');
    console.log(body);
  fly = new Draggable('../assets/fly.png');

}
