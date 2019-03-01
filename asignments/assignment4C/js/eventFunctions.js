'use strict';

function onCollisionEvent(e1,e2){
  // console.log('collisionEvent');
  if (systemManager.doesEntityHaveComponent('cPhysics',e1) &&
     (systemManager.doesEntityHaveComponent('cPhysics',e2))){
       systemManager.sCollisionResolution.systemExecution(e1,e2);
  }

  // if (systemManager.entityContainsRequiredComponents('cCookable',e1)){
  //
  // }
}
