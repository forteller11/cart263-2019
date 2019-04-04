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
    this.polarDrag = .3; //rate at which rotational vel approaches 0
    this.angularVelEffectOnLinear = 10; //how much angle vel effects resultant post collision linear vel
    this.rotationTransferOnCollision = .2;
    this.windX = 0;
    this.windY = .1;
    this.windZ = 0;
  }
}


  class gMouseEvents{ //tracks mouseEvents
    constructor(){
      this.click = false; //on initial click === true, then equals false
      this.down = false;
      this.x = null;
      this.x = null;
      this.histX = [];
      this.histY = [];
      this.histMaxLength = 6;
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
      this.scaleAmount = window.innerHeight/6;

      //rotation of camera
      this.rotationMatrix = matMatComp(rotMat(-this.angleX, 'x'),
                                       rotMat(-this.angleY, 'y'),
                                       rotMat(-this.angleZ, 'z'));

      //what to offset meshes by BEFORE scaling
      this.translationMatrix = transMat(-this.x, -this.y, -this.z); //rotation
      //use at end to center in screen coords
      this.centerMatrix = transMat(window.innerWidth/2, window.InnerHeight/2, 0);

      this.scaleMatrix = diagMat(this.scaleAmount, this.scaleAmount, this.scaleAmount);
    }
  }

  class gInput{ //tracks keyboard input
    constructor(){
      this.lastKeyPressed = null; //some assci code
      this.pressedThisFrame = false; //was lastKeyPressed pressed this frame?
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
