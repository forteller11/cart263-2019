function ran(value1, value2 = value1) { //acts like p5's random function
  if (arguments.length === 1) {
    return Math.random() * value1;
  } else if (arugments.length === 2) {
    const delta = Math.abs(value2 - value1);
    const range = delta * Math.random();
    return range + value1;
  } else {
    console.log("ERROR: wrong number of arguments!");
  }
}
