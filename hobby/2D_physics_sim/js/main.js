"use strict";
let entity= [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  for (let i = 0; i < 1; i ++){
    entity[i] = new Entity(width/2,height/2,20,2);
  }
}

function draw(){

  background(51);
  for (let i = 0; i < entity.length; i ++){
    entity[i].display();
  }

}
