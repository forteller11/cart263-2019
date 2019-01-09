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
  //reset angle of all components and reset their position to neutral so their cartesian possitions
  // can be used to recalculate the same polar radius/angle offsets to keep trakc of their positions bout the parent
  // const angleStore = phyObject.angle; //store current phyObject angle
  // phyObject.angle = 0; //set angle to default
  // for (let i = 0; i < phyObject.component.length; i ++){ //recalc pos of comopnents given default parent angle
  //     phyObject.component[i].calcPos();
  // }

  let component = new Component(phyObject,mouseX,mouseY,0,random(20,80),1,null);
  phyObject.component.push(component);
  phyObject.alterComponents();
  console.log(phyObject);

  // phyObject.angle = angleStore;
}
