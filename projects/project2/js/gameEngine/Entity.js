'use strict';

class Entity{
  constructor(){

    this.id = globalEntityIdCounter;
    globalEntityIdCounter++;
    this.components = []; //array of references to components
    this.componentNames = []; //list of contained components,
    //the rest of entity is taken by key: reference pairs to components
  }

  addComponent(component){
  const name = component.name;
  this[name] = component; //set var name this.(whatever the value of NAME is)

  this.componentNames.push(name);

  this.components.push(component);
  }

  removeHtml(){
    for (let component of this.components)
    component.removeHtml();
  }
}
