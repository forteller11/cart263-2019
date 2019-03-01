'use strict';

class SystemManager {

  constructor() {
    this.systems = []; //array of systems

    this.sOverlap = new sOverlap();
    this.systems.push(this.sOverlap);

    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);

    this.relevantEntities = []; //2d array containing relevant enttiies for each system
    for (let i = 0; i < this.systems.length; i++) { //create 2Darray of relevant components
      this.relevantEntities[i] = [];
    }
    console.log(this.systems);
  }

  addEntity(newEntity) { //find all systems which cocern the entity and track them
    for (let i = 0; i < this.systems.length; i++) { //itterate through systems and
      if (this.entityContainsRequiredComponents(this.systems[i], newEntity)) { //if the entity has all required components
        this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
      }
    }

  }

  removeEntity() { //remove all components and tell systems
    //delete entity from relevant entities, keep list of free spaces in middle of relevant entities array
  }

  update() {
    // collision.update();
    //   staticResolution.update();
    //     dynamicResolution.update();

    this.sOverlap.update();

    this.sPhysicsTransform.update();

    this.sImageTransform.update();


    // for (let j = 0; j < this.relevantEntities[2].length; j++){ //itterate through collum of array
    //   //first only itterate through half of array so everything doesn't happen twice (like with insertion sort)
    //   if (this.sOverlap.systemExecution(this.relevantEntities[2][j]) === true){
    //     //return collision data (both entities,)
    //     //this then the overlap subsystems see if the components of each entity are relevant to its work, if they are, it
    //     // which can be used by static/dynamic resolution and cooking to determine what to do with both entities)
    //   }
    // }

    // this.sPhysicsTransform.systemExecution(); //
    // this.sImageTransform.systemExecution()
    // transform.update();
    // render.update();
  }

  entityContainsRequiredComponents(system, entity) {
    let entityRelevance = true;
    for (let i = 0; i < system.requiredComponents.length; i++) { //for every required component in system
      if (this.doesEntityHaveComponent(system.requiredComponents[i],entity) === false){ //does entity of x component?
        entityRelevance = false;
        break;
      }
    }
    return entityRelevance;
  }

  doesEntityHaveComponent(component,entity){ //returns true or false
    for (let j = 0; j < entity.componentNames.length; j++) { //make sure there is a crresponding comopnent in entity
      if (entity.componentNames[j] === component) {
        return true;
      }
    }
    return false;
  }




}
