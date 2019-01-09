let phyObject;

function setup(){
  createCanvas(windowWidth,windowHeight);
  phyObject = new PhysicsObject();
    console.log(phyObject);
    console.log("setup");
}

function draw(){
  background(51);
  phyObject.update();
}

function mousePressed(){
  console.log("hey");
  let component = new Component(phyObject,mouseX,mouseY,0,random(20,80),1,null);
  phyObject.component.push(component);
  phyObject.alterComponents();
  console.log(phyObject);
}
