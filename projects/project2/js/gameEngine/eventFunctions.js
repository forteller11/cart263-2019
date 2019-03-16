'use strict';

function onCollisionEvent(e1,e2){

    //if entities have doOnOverlap functions execute them and pass other entity as argument
    if (!(e1.cHitbox.doOnOverlap===null)){
      e1.cHitbox.doOnOverlap(e2);
    }
    if (!(e2.cHitbox.doOnOverlap===null)){
      e2.cHitbox.doOnOverlap(e1);
    }
  

  if (systemManager.entityHasComponent('cPhysics',e1) &&
     (systemManager.entityHasComponent('cPhysics',e2))){
       systemManager.sCollisionResolution.systemExecution(e1,e2);
       return;
  }

//change status of draggable
  if (systemManager.entityHasComponent('cDragArea',e1)){
    if (systemManager.entityHasComponent('cDraggable',e2)){
      systemManager.sDraggable.systemExecution(e2,e1);
      return;
    }
  }

  if (systemManager.entityHasComponent('cDragArea',e2)){
    if (systemManager.entityHasComponent('cDraggable',e1)){
      systemManager.sDraggable.systemExecution(e1,e2);
      return;
    }
  }

}
