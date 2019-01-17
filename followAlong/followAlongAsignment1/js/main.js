"use strict"

/*
Assignment 1
Charly Yan Miller
*/
let avatar;
let food = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    food[i] = new Food(random(width), random(height), 32, "#96E58F");
  }
  avatar = new Avatar(mouseX, mouseY, 64, "#D08FE5");
  noCursor();
}

function draw() {
  background(51);
  if (avatar.alive) {
    avatar.update();
  }

  for (let i = 0; i < food.length; i++) {
    food[i].update();
  }

  for (let i = 0; i < food.length; i++) {
    if (circleOverlap(avatar.x,avatar.y,avatar.size/2,food[i].x,food[i].y,food[i].size/2)){
      avatar.size += food[i].size;
      food.splice(i,1);
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
