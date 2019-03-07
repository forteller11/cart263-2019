'use strict';

function onCollisionEvent(e1,e2){
  // console.log('collisionEvent');
  if (systemManager.entityHasComponent('cPhysics',e1) &&
     (systemManager.entityHasComponent('cPhysics',e2))){
       systemManager.sCollisionResolution.systemExecution(e1,e2);
  }

  // if (systemManager.entityContainsRequiredComponents('cCookable',e1)){
  //
  // }
}
