'use strict';
//The parent of a bunch of singleton components
class Globals{
  constructor(){
    this.physics = new gPhysicsConstants();
    this.mouse = new gMouseEvents();
    this.drag = new gDragData();
    this.spawn = new gSpawnRate();
    this.camera = new gCamera();
    this.input = new gInput();
  }
  update(){
    this.mouseEvents.update();
  }
}

class gPhysicsConstants { //stores physics constants
  constructor(){
    this.name = 'cPhysicsConstants';
    this.maxPolarVel = Math.PI/4//max/min polar velocity
    this.cartesianDrag = 0.98; //rate at which linear vel approaches 0
    this.polarDrag = .999; //rate at which rotational vel approaches 0
    this.angularVelEffectOnLinear = 10; //how much angle vel effects resultant post collision linear vel
    this.rotationTransferOnCollision = .2;
    this.windX = 0;
    this.windY = 0;
    this.windZ = 0;
  }
}


  class gMouseEvents{ //tracks mouseEvents
    constructor(){
      this.click = false; //on initial click === true, then equals false
      this.down = false;
      this.x = 0;
      this.y = 0;
      this.histMaxLength = 6;
      this.histX = []; //latest elements are newest
      this.histY = [];
      for (let i = 0; i < this.histMaxLength; i ++){ //fill mouse history with positions
        this.histX[i] = this.x;
        this.histY[i] = this.y;
      }
      this.sensitivity = (Math.PI*2)/window.innerWidth; //how much does movement of mouse in pixels correspond to angle change in radians?

    }
  }

  class gCamera{
    constructor(){
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.angleX = 0;
      this.angleY = 0;
      this.angleZ = 0;
      this.scaleAmount = window.innerWidth;
      this.clippingThreshold  = 0; //FOV kinda: 1 = 90*, 0 = 180; -1 = 360;
      this.rotateSpeed = Math.PI/60;
      //rotation of camera
      this.rotationMatrix = matMatComp(rotMat(-this.angleX, 'x'),
                                       rotMat(-this.angleY, 'y'),
                                       rotMat(-this.angleZ, 'z'));

      //what to offset meshes by BEFORE scaling
      this.translationMatrix = transMat(this.x, -this.y, this.z); //rotation
      //use at end to center in screen coords
      this.centerMatrix = transMat(window.innerWidth/2, window.innerHeight/2, 0);

      this.scaleMatrix = diagMat(this.scaleAmount, this.scaleAmount, this.scaleAmount);

    this.directionVector = matVecMult(this.rotationMatrix,[0,0,1,1]); //where is the camera pointing (array representing vector, with z as up direciton)

    //z == up direction
    }
  }

  class gInput{ //tracks keyboard input
    constructor(){
      this.keysDown = [] //array of keyCodes of keys currentdown
      this.moveSpeed = .1;
    }
  }

  class gDragData{
    constructor(){
      this.dragOffsetX = null;
      this.dragOffsetY = null;
      this.dragEntityRef = null;
    }
  }

  class gSpawnRate{
    constructor(){
      this.rate = 1/(60*20) //avg every 5 s;
    }
  }
