"use strict";

window.onload = main;
let fly;

function main(){

  console.log("main");
  let flyElement = document.getElementById('flyElement');
  console.log(flyElement);
  fly = new Fly(flyElement);

}
 
