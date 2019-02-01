function randomRange(value1,value2){ //returns random range between value1 and value2
  const delta = value2-value1;
  const range = delta*Math.random();
  return range + value1;
}
