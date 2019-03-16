'use strict';

class SystemManager {

  constructor() {
    this.systems = []; //array of systems
    //if not pushed into system then this represents a subsystem whos update does
    //not occur on regular tick but rather is called from some event from another system
    this.sOverlap = new sOverlap();
    this.systems.push(this.sOverlap);

    this.sCollisionResolution = new sCollisionResolution(); //sub system, not responsible for own tick/update

    this.sDrag = new sDrag();
    this.systems.push(this.sDrag);

    this.sDraggable = new sDraggable();

    this.sOutOfBoundsHandler = new sOutOfBoundsHandler();
    this.systems.push(this.sOutOfBoundsHandler);

    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);

    console.log(this.systems);
  }

  update() {

    this.sOverlap.update(); //this has multiple subsystems

    this.sPhysicsTransform.update();

    this.sDrag.update();

    this.sOutOfBoundsHandler.update();

    this.sImageTransform.update();
  }

  entityHasComponent(component, entity) { //returns true or false
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
      if (this.entityHasComponent(requiredComponent[i], entity) === false) { //does entity of x component?
        entityRelevance = false;
        break;
      }
    }
    return entityRelevance;
  }

  entityContainsARequiredBlueprint(requiredBlueprints, entity) {
    //if it is created by a listed blueprint return true
    for (let i = 0; i < requiredBlueprints.length; i++) { //for every required component in system
      if (entity.blueprintName === requiredBlueprints[i]) { //does entity of x component?
        return true;
      }
    }
    return false;
  }

  addEntity(newEntity) { //find all systems which cocern the entity and track them
    for (let i = 0; i < this.systems.length; i++) { //itterate through systems and
      if (this.entityContainsRequiredComponents(this.systems[i].requiredComponents, newEntity)) {
        // if (this.entityContainsARequiredBlueprint(this.systems[i], newEntity)) {
          this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
        // }
      }

      // if (this.entityContainsRequiredComponents(this.systems[i], newEntity)) { //if the entity has all required components
      //   this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
      // }
    }

  }

  removeEntity(entity) { //remove this entity from all sytems
    console.log(entity);
    console.log(this.systems);
    for (let i = 0; i < this.systems.length; i++) {
      for (let j = 0; j < this.systems[i].relevantEntities.length; j++) {
        if (this.systems[i].relevantEntities[j].id === entity.id) {
          // console.log('splice');
          // console.log(system.relevantEntities[i])
          this.systems[i].relevantEntities[j].removeHtml();
          this.systems[i].relevantEntities.splice(j, 1);
          break;
        }
      }
    }
    /*this algorithim scales linearly with number of entities and also linearly
    with number of systems which is pretty inefficient,
    this could be achieved in constant time wish hashing but I don't think JS
     lends itself to hashtables and i am not comfortable with this way of storing acessing vars
     and in this particular project there is a trival number of systems and entities
     so I will worry about fixing it in future itterations
    */
  }

}
