"use strict";
let part = [];
const gravity = .2;
const airResistance = 1.01;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
}

function draw() {
  background(51);
  for (let i = 0; i < part.length; i++) {
    part[i].velocity.y += gravity;;
    part[i].update();
    part[i].display();
    if (part[i].size < 2){
      part.splice(i,1);
    }
  }

  if (mouseIsPressed){
    const r = random(3);
    if (r < 1){
      part.push(new Triangle(mouseX,mouseY));
    }
    if ((r > 1) && (r < 2)){
      part.push(new Circle(mouseX,mouseY));
    }
    if ((r > 2) && (r < 3)){
      part.push(new Square(mouseX,mouseY));
    }
  }
}
