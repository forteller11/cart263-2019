'use strict';

class SystemManager {

  constructor() {
    this.systems = []; //array of systems

    this.sOverlap = new sOverlap();
    this.systems.push(this.sOverlap);

    this.sCollisionResolution = new sCollisionResolution(); //sub system, not responsible for own tick/update

    this.sDrag = new sDrag();
    this.systems.push(this.sDrag);

    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);

    console.log(this.systems);
  }

  addEntity(newEntity) { //find all systems which cocern the entity and track them
    for (let i = 0; i < this.systems.length; i++) { //itterate through systems and
      if (this.entityContainsRequiredComponents(this.systems[i].requiredComponents,newEntity)){
        this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
      }

      // if (this.entityContainsRequiredComponents(this.systems[i], newEntity)) { //if the entity has all required components
      //   this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
      // }
    }

  }

  removeEntity() { //remove all components and tell systems
    //delete entity from relevant entities, keep list of free spaces in middle of relevant entities array
  }

  update() {

    this.sOverlap.update(); //this has multiple subsystems

    this.sDrag.update();

    this.sPhysicsTransform.update();

    this.sImageTransform.update();
  }


  entityHasComponent(component,entity){ //returns true or false
    for (let j = 0; j < entity.componentNames.length; j++) { //make sure there is a crresponding comopnent in entity
      if (entity.componentNames[j] === component) {
        return true;
      }
    }
    return false;
  }

  entityContainsRequiredComponents(requiredComponent, entity) {
      let entityRelevance = true;
      for (let i = 0; i < requiredComponent.length; i++) { //for every required component in system
        if (this.entityHasComponent(requiredComponent[i], entity) === false){ //does entity of x component?
          entityRelevance = false;
          break;
        }
      }
      return entityRelevance;
    }




}
