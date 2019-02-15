//barebones 2D vector class (only added methods needed for this specefic projects purposes)
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
    console.log("wrong number of arugments!");
    return undefined;
  }
}
