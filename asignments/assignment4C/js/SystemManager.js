'use strict';

class SystemManager{
  constructor(){
    this.systems = []; //array of systems
    this.relevantComponents = [][];

    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);

  }

  addEntity(newEntity){ //find all systems which cocern the entity and track them

    for (let i = 0; i < this.systems.length; i ++){ //itterate through systems and
      let entitysRelevance = true; //is entity relevant?
      let requiredComponentFound = [];

      for (let j = 0; j < this.systems[i].relevantComponents.length; j ++) { //for every relevant component in system
        let requiredSystemComponent = this.systems[i].relevantComponents[j]; //id of required comopnent
        let requiredComponentFound = false; //is there required component for system in the entity

        for (let k = 0; k < newEntity.components.length; k ++){ //make sure there is a crresponding comopnent in entity
          if (requiredSystemComponent === newEntity.components[k]){
            requiredComponentFound = true;
            break;
          }
        }
        if (requiredComponentFound === false){ //if couldn't find a entityComponent required by system
          entityRelevance = false; //entity not relevant
          break; //break outta loop, go to next system
        }

      }
      if (entityRelevance === true){ //if got to end of loop / entity relevance still is true,
        this.relevantComponents[i][].push(newEntity); //put on 
      }
    }

  }

  removeEntity(){ //remove all components and tell systems

  }

  update(){
    // collision.update();
    //   staticResolution.update();
    //     dynamicResolution.update();
    this.sPhysicsTransform.systemExecution(entity); //
    transform.update();
    render.update();
  }
}
