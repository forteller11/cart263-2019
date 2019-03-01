'use strict';
class System{ //base functionality for all systems
  constructor(arrayOfRelevantEntities){
    this.relevantEntities = []; //array of relevant entities to system
    this.requiredComponents = []; //array of relevant components
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


class sPhysicsTransform extends System { //applys drags and phy constants (gravity if applicable)
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos','cPhysics'];
  }

  systemExecution(entity){
    //generalize to 3 dimensions
    //apply drag and constrain velocties
    entity.cPhysics.vel.mult(globalObj.physics.cartesianDrag);
    entity.cPhysics.angularVel *= globalObj.physics.polarDrag;
    entity.cPhysics.angularVel = constrain(entity.cPhysics.angularVel, -globalObj.physics.maxPolarVel, globalObj.physics.maxPolarVel);
    entity.cPos.angle += entity.cPhysics.angularVel;

    //transform position based on velocties
    entity.cPos.x += entity.cPhysics.vel.x;
    entity.cPos.y += entity.cPhysics.vel.y;
    entity.cPos.angle += entity.cPhysics.angularVel;
  }

}


class sImageTransform extends System{ //transforms image to entity position
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos','cHitbox','cImage'];
  }

  systemExecution(entity){
    const angleDegrees = entity.cPos.angle*180;
    entity.cImage.image.style.transform = 'rotate('+angleDegrees+'deg)';

    entity.cImage.image.style.left = ( entity.cPos.x - entity.cHitbox.radius) + 'px';
    entity.cImage.image.style.top = (entity.cPos.y - entity.cHitbox.radius) + 'px';
  }

}

class sOverlap extends System{ //transforms image to entity position
  constructor(arrayOfRelevantEntities){
    super(arrayOfRelevantEntities);
    this.requiredComponents = ['cPos','cHitbox'];
  }

  systemExecution(entity){
    const angleDegrees = entity.cPos.angle*180;
    entity.cImage.image.style.transform = 'rotate('+angleDegrees+'deg)';
    entity.cImage.image.style.left = ( entity.cPos.x - entity.cHitbox.radius) + 'px';
    entity.cImage.image.style.top = (entity.cPos.y - entity.cHitbox.radius) + 'px';
  }

  update(){
    //cycle through all relevant entities
    onCollisionEvent();
  }

}

//class dragEvents (stores mouse info), class dragble (tells it can be dragged, stores offsets)
//sDrag requires dragEvents, dragable, pos, physics, tests collision,

//collision system, static/dynamic resolution ssytems... draggable, component which stores drag events


// class handleSprites(){} for food entity and animations
