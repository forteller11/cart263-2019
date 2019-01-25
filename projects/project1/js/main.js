"use strict";
window.onload = main;
let player;
let mouseX = 0;
let mouseY = 0;


function main(){
  //create textinput and child it to the body
  document.addEventListener("click",trackMouseMovement);
  let textInput = document.createElement("INPUT");
  let body = document.getElementsByTagName("body");
  textInput.setAttribute("type","text");
  body[0].appendChild(textInput);

  player = new Player(textInput); //instatiate player with reference to newly created text input
  player.update();
}
function trackMouseMovement(e){ //store position of mouse in global variables
  mouseX = e.clientX; //"client" means get pos of mouse relative to window pos (and not monitor pos)
  mouseY = e.clientY;
  player.update();
  console.log("mouseX"+mouseX);
    console.log("window.innerWidth"+window.innerWidth);
}
