"use strict";

window.onload = main;

let body;
const circlePop = 2;
let circles = [];

function main(){
  console.log('main');
  body = document.getElementById('body');
  for (let i = 0; i < circlePop; i++){
const newCircle = new Entity('assets/face1.png');
circles.push(newCircle);
  }
  circles[0].x=0;
  circles[0].velocity.x = 2;
  circles[1].x=600;
  setInterval(update,16.7);
}

function update(){
  // console.log('update');
  for (let i = 0; i < circles.length; i++){
    for (let j = i+1; j < circles.length; j ++){ //might go out of scope of array depending on if check or execution happens first
      entityCollision(circles[i],circles[j]);
    }
    circles[i].update();
  }


}





function entityCollision(e1,e2){
  const deltaX = e2.x-e1.x;
  const deltaY = e2.y-e1.y;
  const distBetween = distFromDelta(deltaX,deltaY);
  console.log('distBetween: '+distBetween);
  if (distBetween < e1.radius+e2.radius){ //if this is true, then circles are colliding
    const distOverlapping = e1.radius+e2.radius-distBetween;

    //static resolution (make it so circles don't overlap post collision)
    if (e2.x > e1.x){
      e1.x -= distOverlapping/2;
      e2.x += distOverlapping/2;
    } else {
      e1.x += distOverlapping/2;
      e2.x -= distOverlapping/2;
    }

    if (e2.y > e1.y){
      e1.y -= distOverlapping/2;
      e2.y += distOverlapping/2;
    } else {
      e1.y += distOverlapping/2;
      e2.y -= distOverlapping/2;
    }

    //dynamic resolution (Change velocities of balls accordingly)

  }
}
