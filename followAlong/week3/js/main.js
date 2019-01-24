"use strict";
window.onload = main;
let time;
let spans = [];
// spans = document.getElementsByClassName("redacted");

function main() {
  spans = document.getElementsByClassName("redacted");
  for (let span of spans){
    span.addEventListener('click',function(){
      console.log("AHH");
      if (span.className ==="highlighted"){
        span.setAttribute("class","redacted");
      }
    });
  }
  setInterval(update, 200);
}
// update is pointer to function;
// update() is value of function (all of its executed commands)
// function update declares the value of the function
function update() {
  for (let span of spans){
    if (Math.random(1) < .5){
      // span.classList.add("hightlighted");
      span.setAttribute("class","highlighted");
    }
    // if (Math.random(1) < .1){
    //   span.classList.add("dog");
    // }
  }
  // console.log("Hey");
}

// function main(){
//   let divs = document.getElementsByTagName('div');
//   for (let d of divs){
//     d.style.color = "red";
//   }
//   for (let d of divs){
//     d.addEventListener('click',function(e){
//       console.log(e);
//       e.target.style.display = "none";
//     });
//   }
//
// // let $divs = $('div');
// // $divs.fadeIn() = "none";
// }
//
// function draw(){
//
// }
