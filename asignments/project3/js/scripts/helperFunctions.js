//helpful functions
"use strict";

function distBetween(x1, y1, x2, y2) {
  if (arguments.length === 4) {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    const distSq = (deltaX * deltaX) + (deltaY * deltaY);
    return Math.sqrt(distSq);

  } else if (arguements.length === 2) {
    const distSq = x1 + y1;
    return Math.sqrt(distSq);
  } else {
    console.log("ERROR: invalid num of arguments in distBetween function!");
    return undefined;
  }
}

function distFromDelta(xComponent, yComponent) { //pythag theroum
  return Math.sqrt((xComponent * xComponent) + (yComponent * yComponent))
}

function pythag(...args) { //pythag theorum (distance from delta) in n dimensions
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += Math.pow(args[i], 2);
  }
  return Math.pow(sum, 1 / 2);
}

function trackMouseMovement(e) { //store position of mouse in global variables
  mouseX = e.clientX; //"client" means get pos of mouse relative to window pos (and not monitor pos)
  mouseY = e.clientY;
}

function constrain(varr, min, max) { //same functionality as p5's constrain();
  let varrConstrained = varr;
  if (varr > max) {
    varrConstrained = max;
  }
  if (varr < min) {
    varrConstrained = min;
  }
  return varrConstrained;
}

function ran(value1, value2) { //acts like p5's random function
  switch (arguments.length) {
    case 0: //random 0-1
      return Math.random();
    case 1: //random 0-value1
      return Math.random() * value1;
    case 2: //random range between value1 and 2
      const delta = Math.abs(value2 - value1);
      const range = delta * Math.random();
      return range + min(value1, value2);
    default:
      console.log("ERROR: Too many arguments in ran function!");
      return;
  }
}

function min() { //returns smallest argument
  let currentMin = Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] < currentMin) {
      currentMin = arguments[i];
    }
  }
  return currentMin;
}

function linearInterpolate(lerpAmount, value1, value2) {
  const valueDelta = value2 - value1; //find difference between values
  const lerpAdd = lerpAmount * valueDelta; //find percentage of delta which user wants to lerp by
  const lerpResult = lerpAdd + value1; //add constant
  return lerpResult;
}

function mapFromRanges(value, range1a, range1b, range2a, range2b) {
  //map value 1 between range1 --> range2
  const range1 = range1b - range1a;
  const valuesInterpolationBetweenRange1 = (value - range1a) / range1;
  return linearInterpolate(valuesInterpolationBetweenRange1, range2a, range2b);


  if (!(arguments.length === 5)) {
    console.log("ERROR: invalid num of arguments in map function!");
  }
}

function dotProduct(v1, v2) { //returns dot product of two vectors
  return (v1.x * v2.x) + (v1.y * v2.y);
}

function ranIndexOfArray(arr) {
  const ranNumberBelowArrLength = ran(arr.length - Number.MIN_VALUE); //- min value so this number can never === arr.length
  return Math.floor(ranNumberBelowArrLength);
}

function mean(...args) { //finds the mean between a set of numbers
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum / args.length;
}

//log if on debug mode
function dLog(strToLog) {
  if (debugMode) {
    console.log(strToLog);
  }
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
}

function isEven(numb) { //return true if number is even
  if ((numb % 2) === 0) { //if there is no remainder
    return true;
  }
  return false;
}

function cssRGBA(arr) {
  let r = arr[0];
  let g = arr[1];
  let b = arr[2];
  let a = 1; //alpha 1 if not otherwise specefied
if (arr.length === 4){ //if alpha specefied
  a = arr[3];
}
  return `rgb(${r},${g},${b},${a})`;
}
