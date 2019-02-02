
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

function checkPointWithRectangleOverlap(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
  if ((pointX >= rectX - rectWidth / 2) && ((pointX <= rectX + rectWidth / 2))) { //horz collision?
    if ((pointY >= rectY - rectHeight / 2) && ((pointY <= rectY + rectHeight / 2))) { //horz collision?
      return true;
    }
  }
  return false;
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

function distFromDelta(xComponent,yComponent){
  return Math.sqrt((xComponent*xComponent)+(yComponent*yComponent))
}

function linearInterpolate(value1,value2,lerpAmount){
  const valueDelta = value1 - value2; //find difference between values
  const lerpAdd = lerpAmount * valueDelta
  const lerpResult = lerpAdd + value2;
  return lerpResult;
}
