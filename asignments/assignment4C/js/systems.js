'use strict';
class System{ //base functionality for all systems
  constructor(arrayOfRelevantEntities){
    this.relevantComponents = [null]; //array of relevant components
    this.relevantEntities = [null]; //entities with appropriate components for system
  }

  systemExecution(entity){
    console.log('overide this method for useful system');
  }

  update(){
    for (let entity of this.relevantEntities){
      this.systemExecution(entity);
    }
  }

}

class sPhysics extends System { //applys drags and phy constants (gravity if applicable)
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.relevantComponents[cPos,cPhysics,cPhysicsConstants]
  }

  systemExecution(entity){
    //generalize to 3 dimensions
    entity.cPhysics.vel.mult(cPhysicsConstants.cartesianDrag);
    entity.cPhysics.angularVel *= cPhysicsConstants.polarDrag;
    const maxAngle
    entity.cPhysics.angularVel = constrain(entity.cPhysics.angularVel, -cPhysicsConstants.maxPolarVel, cPhysicsConstants.maxPolarVel);
    entity.cPos.angle += entity.physicsC.angularVel;
  }

}

class sTransform extends System{ //changes transform component based on physics component
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.relevantComponents[cPos,cPhysics]
  }

  systemExecution(entity){
    //generalize to 3 dimensions
    entity.cPos.x += entity.cPhysics.vel.x;
    entity.cPos.y += entity.cPhysics.vel.y;
    entity.cPos.angle += entity.cPhysics.angularVel;
  }

}
