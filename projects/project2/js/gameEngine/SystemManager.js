'use strict';

class SystemManager {

  constructor() {
    this.systems = []; //array of systems
    //if not pushed into system then this represents a subsystem whos update does
    //not occur on regular tick but rather is called as a cosequence of some event from another system
    this.sVideoSpawner = new sVideoSpawner();
    this.systems.push(this.sVideoSpawner);

    this.sOverlap = new sOverlap();
    this.systems.push(this.sOverlap);

    this.sCollisionResolution = new sCollisionResolution(); //sub system, not responsible for own tick/update

    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sDrag = new sDrag();
    this.systems.push(this.sDrag);

    this.sDraggable = new sDraggable();

    this.sOutOfBoundsHandler = new sOutOfBoundsHandler();
    this.systems.push(this.sOutOfBoundsHandler);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);
  }

  update() {
    for (let system of this.systems){ //update all systems (some of them contain virtual update methods)
      system.update();
    }

  }

  entityHasComponent(component, entity) { //does entity have this component?
    for (let j = 0; j < entity.componentNames.length; j++) { //make sure there is a crresponding comopnent in entity
      if (entity.componentNames[j] === component) {
        return true;
      }
    }
    return false;
  }

  entityContainsRequiredComponents(requiredComponent, entity) { //does entitiy contain array of required components?
    let entityRelevance = true;
    for (let i = 0; i < requiredComponent.length; i++) { //for every required component in system
      if (this.entityHasComponent(requiredComponent[i], entity) === false) { //does entity of x component?
        entityRelevance = false;
        break;
      }
    }
    return entityRelevance;
  }

  entityContainsARequiredBlueprint(requiredBlueprints, entity) { //was entity created with one of the required blueprints?
    if (requiredBlueprints.length === 0) { //if system doesn't have any required blueprints, then entity passes by default
      return true;
    }
    for (let i = 0; i < requiredBlueprints.length; i++) { //if entity has at least one requiredBlueprints, it passes
      if (entity.blueprintName === requiredBlueprints[i]) {
        return true;
      }
    }
    return false;
  }

  addEntity(newEntity) { //add entity to all appropriate systems
    for (let i = 0; i < this.systems.length; i++) { //itterate through systems and
      if (this.entityContainsRequiredComponents(this.systems[i].requiredComponents, newEntity)) {
        if (this.entityContainsARequiredBlueprint(this.systems[i].requiredBlueprints, newEntity)) {
          this.systems[i].relevantEntities.push(newEntity); //add entity to relevant entities of system
        }
      }
    }
  }

  /*this scales linearly with number of entities and and systems which is pretty inefficient,
    this could be achieved in constant time using a hashtable, 
    but at the time of writing the algo I was not comfortable with hashtables
    and there is are a trivial number of entities and systems anyways so it doesn't matter.
    */
  removeEntity(entity) { //remove this entity from all sytems
    if ( debugMode)console.log('entity removed!');
    for (let i = 0; i < this.systems.length; i++) {
      for (let j = 0; j < this.systems[i].relevantEntities.length; j++) {
        if (this.systems[i].relevantEntities[j].id === entity.id) {
          this.systems[i].relevantEntities[j].removeHtml();
          this.systems[i].relevantEntities.splice(j, 1);
          break;
        }
      }
    }
    
  }

}
