
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
      console.log("ERROR: wrong number of arguments!");
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

function distFromDelta(xComponent,yComponent){ //pythag theroum
  return Math.sqrt((xComponent*xComponent)+(yComponent*yComponent))
}

function linearInterpolate(value1,value2,lerpAmount){
  const valueDelta = value1 - value2; //find difference between values
  const lerpAdd = lerpAmount * valueDelta; //find percentage of delta which user wants to lerp by
  const lerpResult = lerpAdd + value2; //add constant
  return lerpResult;
}
