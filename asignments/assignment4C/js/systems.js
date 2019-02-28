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
    this.relevantComponents[cPos,cPhysics,cPhysicsConstants];
  }

  systemExecution(entity){
    //generalize to 3 dimensions
    //apply drag and constrain velocties
    entity.cPhysics.vel.mult(cPhysicsConstants.cartesianDrag);
    entity.cPhysics.angularVel *= cPhysicsConstants.polarDrag;
    const maxAngle
    entity.cPhysics.angularVel = constrain(entity.cPhysics.angularVel, -cPhysicsConstants.maxPolarVel, cPhysicsConstants.maxPolarVel);
    entity.cPos.angle += entity.physicsC.angularVel;

    //transform position based on velocties
    entity.cPos.x += entity.cPhysics.vel.x;
    entity.cPos.y += entity.cPhysics.vel.y;
    entity.cPos.angle += entity.cPhysics.angularVel;
  }

}


class sTransform extends System{ //changes transform component based on physics component
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.relevantComponents[cPos,cPhysics];
  }

  systemExecution(entity){
    //generalize to 3 dimensions
    entity.cPos.x += entity.cPhysics.vel.x;
    entity.cPos.y += entity.cPhysics.vel.y;
    entity.cPos.angle += entity.cPhysics.angularVel;
  }

}



class sTransformImage extends System{ //transforms image to entity position
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.relevantComponents[cPos,cHitbox,cImage];
  }

  systemExecution(entity){
    const angleDegrees = entity.cPos.angle*180;
    entity.cImage.style.transform = 'rotate('+angleDegrees+'deg)';

    entity.cImage.style.left = ( entity.cPos.x - entity.cHitbox.radius) + 'px';
    this.image.style.top = (entity.cPos.y - entity.cHitbox.radius) + 'px';
  }

}

//collision system, static/dynamic resolution ssytems...


// class handleSprites(){} for food entity and animations
