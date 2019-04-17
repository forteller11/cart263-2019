'use strict';

class SystemManager {

  constructor() {
    this.systems = []; //array of systems
    //if not pushed into system then this represents a subsystem whos update does
    //not occur on regular tick but rather is called as a cosequence of some event from another system




    console.log(sPhysicsTransform);
    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sMove = new sMove();
    this.systems.push(this.sMove);

    this.sRotUI = new sRotUI();
    this.systems.push(this.sRotUI);

    this.sRender = new sRender();
    this.systems.push(this.sRender);

    this.sInput = new sInput(); //have this last because it's update needs to come after all other systems have executed
    this.systems.push(this.sInput);
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
    /*this algorithim scales linearly with number of entities and also linearly
    with number of systems which is pretty inefficient,
    this could be achieved in constant time wish hashing but I don't think JS
     lends itself to hashtables and i am not comfortable with this way of storing acessing vars
     and in this particular project there is a trival number of systems and entities
     so I will worry about fixing it in future itterations
    */
  }

}
