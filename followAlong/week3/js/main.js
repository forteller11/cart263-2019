"use strict";

window.onload = main;
let secrets = [];
let counter;
let counterNumber = 0;
function main(){
  secrets = document.getElementsByClassName("secret");
  counter = document.getElementById("counter");
  counter.innerHTML = "you have found "+counterNumber+" secrets!";
  for (let secret of secrets){
    secret.addEventListener("mouseover",onHover);
  }
  // setInterval(update,20);
}
function onHover(e){
  if (e.target.className === "secret"){
    counterNumber ++;
    counter.innerHTML = "you have found "+counterNumber+" secrets!";
    e.target.className = "found";
  }
}



// function update(){
//   secrets = document.getElementsByClassName("secret");
// }



// "use strict";
// window.onload = main;
// let time;
// let spans = [];
// // spans = document.getElementsByClassName("redacted");
//

// function main() {
//   spans = document.getElementsByClassName("redacted");
//   for (let span of spans){
//     span.addEventListener('click',function(){
//       console.log("AHH");
//       if (span.className ==="highlighted"){
//         span.setAttribute("class","redacted");
//       }
//     });
//   }
//   setInterval(update, 200);
// }
// // update is pointer to function;
// // update() is value of function (all of its executed commands)
// // function update declares the value of the function
// function update() {
//   for (let span of spans){
//     if (Math.random(1) < .5){
//       // span.classList.add("hightlighted");
//       span.setAttribute("class","highlighted");
//     }
//     // if (Math.random(1) < .1){
//     //   span.classList.add("dog");
//     // }
//   }
//   // console.log("Hey");
// }
//
// //
