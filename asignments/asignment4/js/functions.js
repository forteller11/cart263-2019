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

function min() { //return smallest argument
  let currentMin = arguments[0];
  for (let argument of arguments) {
    if (argument < currentMin) {
      currentMin = argument;
    }
  }
  return currentMin;
}
