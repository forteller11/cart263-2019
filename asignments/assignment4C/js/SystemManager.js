'use strict';

class SystemManager{
  constructor(){
    this.systems = []; //array of systems


    this.sPhysicsTransform = new sPhysicsTransform();
    this.systems.push(this.sPhysicsTransform);

    this.sImageTransform = new sImageTransform();
    this.systems.push(this.sImageTransform);

  this.relevantEntities = []; //2d array containing relevant enttiies for each system
  for (let i = 0; i < this.systems.length; i ++){ //create 2Darray of relevant components
    this.relevantEntities[i] = [];
  }
  }

  addEntity(newEntity){ //find all systems which cocern the entity and track them

    for (let i = 0; i < this.systems.length; i ++){ //itterate through systems and
      let entityRelevance = true; //is entity relevant?
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
          console.log('this entity isnt relevant')
          break; //break outta loop, go to next system
        }

      }
      if (entityRelevance === true){ //if got to end of loop / entity relevance still is true,
        console.log(j+'this entity is relevant')
        this.relevantEntities[i][this.relevantEntities[i].length] = newEntity; //put on
      }
    }

  }

  removeEntity(){ //remove all components and tell systems

  }

  update(){
    // collision.update();
    //   staticResolution.update();
    //     dynamicResolution.update();
    for (let j = 0; j < this.relevantEntities[0].length; j++){ //itterate through collum of array
      this.sPhysicsTransform.systemExecution(this.relevantEntities[0][j]);
    }

    for (let j = 0; j < this.relevantEntities[1].length; j++){ //itterate through collum of array
      this.sImageTransform.systemExecution(this.relevantEntities[1][j]);
    }

    // for (let j = 0; j < this.relevantEntities[2].length; j++){ //itterate through collum of array
    //   //first only itterate through half of array so everything doesn't happen twice (like with insertion sort)
    //   if (this.sOverlap.systemExecution(this.relevantEntities[2][j]) === true){
    //     //return collision data (both entities,)
    //     //this then the overlap subsystems see if the components of each entity are relevant to its work, if they are, it
    //     // which can be used by static/dynamic resolution and cooking to determine what to do with both entities)
    //   }
    // }

    this.sPhysicsTransform.systemExecution(); //
    this.sImageTransform.systemExecution()
    transform.update();
    render.update();
  }
}
