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

function distFromDelta(xComponent,yComponent){ //pythag theroum
  return Math.sqrt((xComponent*xComponent)+(yComponent*yComponent))
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

function min(){ //returns smallest argument
  let currentMin = Infinity;
  for (let i = 0; i < arguments.length; i++){
    if (arguments[i] < currentMin){
      currentMin = arguments[i];
    }
  }
  return currentMin;
}

function linearInterpolate(value1,value2,lerpAmount){
  const valueDelta = value1 - value2; //find difference between values
  const lerpAdd = lerpAmount * valueDelta; //find percentage of delta which user wants to lerp by
  const lerpResult = lerpAdd + value2; //add constant
  return lerpResult;
}

function mapFromRanges(value,range1a,range1b,range2a,range2b){
  //map value 1 between range1 --> range2
  const range1 = range1b-range1a;
  const percentageOfRange1 = value/range1;

  const range2 = range2b-range2a;
  const lerpRange2ByPercentageOfRange1 = range2*percentageOfRange1;
  return lerpRange2ByPercentageOfRange1 + range2a; //add constant

  if (!(arguments.length === 5)){
    console.log("ERROR: invalid num of arguments in map function!");
  }
}

function dotProduct(v1,v2){ //returns dot product of two vectors
  return (v1.x*v2.x)+(v1.y*v2.y);
}

function ranIndexOfArray(arr){
  const ranNumberBelowArrLength = ran(arr.length-Number.MIN_VALUE); //- min value so this number can never === arr.length
  return Math.floor(ranNumberBelowArrLength);
}

function mean(...args){ //finds the mean between a set of numbers
  let sum = 0;
  for (let i = 0; i < args.length; i ++){
    sum += args[i];
  }
  return sum/args.length;
}
