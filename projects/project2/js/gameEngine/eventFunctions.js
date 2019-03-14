'use strict';

function onCollisionEvent(e1,e2){
  // console.log('collisionEvent');
  // systemManager.removeEntityWithId(e1.id);
  if (systemManager.entityHasComponent('cPhysics',e1) &&
     (systemManager.entityHasComponent('cPhysics',e2))){
       systemManager.sCollisionResolution.systemExecution(e1,e2);
  }

//change status of draggable
  if (systemManager.entityHasComponent('cDragArea',e1)){
    if (systemManager.entityHasComponent('cDraggable',e2)){
      systemManager.sDraggable.systemExecution(e2,e1);
    }
  }

  if (systemManager.entityHasComponent('cDragArea',e2)){
    if (systemManager.entityHasComponent('cDraggable',e1)){
      systemManager.sDraggable.systemExecution(e1,e2);
    }
  }

}
