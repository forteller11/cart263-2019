"use strict"

/*
Assignment 2
Charly Yan Miller
*/
let avatar;
let food = [];
let part = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    food[i] = new Food(random(width), random(height), random(20,60), "#FFFFFF");
  }
  avatar = new Avatar(mouseX, mouseY, 64, "#FFFFFF");
  noCursor();
}

function draw() {
  background(0);
  if (avatar.alive) {
    avatar.update();
  }

  for (let i = 0; i < food.length; i++) {
    food[i].update();
  }

  for (let i = 0; i < part.length; i++) {
    part[i].update();
  }
  for (let i = 0; i < food.length; i++) {
    if (circleOverlap(avatar.x,avatar.y,avatar.size/2,food[i].x,food[i].y,food[i].size/2)){
      avatar.size += food[i].size;
      const partCreateNumber = round(food[i].size/3);
      for (let i = 0; i < partCreateNumber; i ++){
        // const partSize = random(food[i].size/3,food[i].size*3);
        part.push(new Particle(avatar.x,avatar.y,random(partCreateNumber,partCreateNumber*3),avatar.velocity.x,avatar.velocity.y));
      }
      food[i].reset();
      // food.splice(i,1);
    }
  }
  for (let i = 0; i < food.length; i++) {
    food[i].display();
  }
  avatar.display();
}


function circleOverlap(x1, y1, r1, x2, y2, r2) {
  const distBetweenPoints = sqrt(sq(x1 - x2) + sq(y1 - y2));
  if (distBetweenPoints < r1 + r2) {
    return true;
  } else {
    return false;
  }
}
