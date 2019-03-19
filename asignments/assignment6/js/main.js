"use strict";

window.onload = main;

let condiment = null;
let verb = 'is';
let article = 'a';
let characterArchetype = null;
let mood = null;
let celebrity = null;
let place = null;
  let vowels = ['a','o','u','e','i'];

function main(){

  let text = document.createElement('DIV');
  // text.style.position = 'fixed';
  text.width = 'auto';
  text.height = 'auto';
  // text.style.left = window.innerWidth/2 +'px';
  // text.style.top = window.innerHeight/2 +'px';
  text.innerHTML = 'CLICK TO BEGIN';
  document.body.appendChild(text);

  document.addEventListener("mousedown",()=>location.reload(false) );
  let condimentUrl = 'https://raw.githubusercontent.com/pippinbarr/cart263-2019/master/activities/data/condiments/data/data.json';
  let characterArchetypeUrl = 'https://raw.githubusercontent.com/dariusk/corpora/master/data/archetypes/character.json';
  let moodsUrl = 'https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/moods.json';
  let celebsUrl = 'https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/celebrities.json';
  let placeUrl = 'https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/us_federal_agencies.json';

  let condimentRequest = new XMLHttpRequest();
  condimentRequest.open('GET',condimentUrl); //open/setup request
  condimentRequest.responseType = 'json';
  condimentRequest.send();

  let characterArchetypeRequest = new XMLHttpRequest();
  characterArchetypeRequest.open('GET',characterArchetypeUrl); //open/setup request
  characterArchetypeRequest.responseType = 'json';
  characterArchetypeRequest.send();


  let moodsRequest = new XMLHttpRequest();
  moodsRequest.open('GET',moodsUrl); //open/setup request
  moodsRequest.responseType = 'json';
  moodsRequest.send();

  let celebsRequest = new XMLHttpRequest();
  celebsRequest.open('GET',celebsUrl); //open/setup request
  celebsRequest.responseType = 'json';
  celebsRequest.send();

  let placeRequest = new XMLHttpRequest();
  placeRequest.open('GET',placeUrl); //open/setup request
  placeRequest.responseType = 'json';
  placeRequest.send();



  condimentRequest.onload = () => {
    const condiments = condimentRequest.response.condiments;
    condiment = condiments[ranIndexOfArr(condiments)];
    if (condiment[condiment.length-1] === 's'){ //plural
      verb = 'are';
    }

    }
    changeText(text);


  characterArchetypeRequest.onload = () => {
    console.log(characterArchetypeRequest.response.characters);
    const characters = characterArchetypeRequest.response.characters;
    characterArchetype = ranElementOfArr(characters).name;
    for (let vowel of vowels){ //an or a?
      if (characterArchetype[0] === vowel){
        article = 'an';
      }
    }
  changeText(text);
  }


moodsRequest.onload = () => {;
  console.log(moodsRequest.response);
  mood = ranElementOfArr(moodsRequest.response.moods);
  changeText(text);
}

celebsRequest.onload = () => {
  console.log(celebsRequest.response)
  celebrity = ranElementOfArr(celebsRequest.response.celebrities);
  changeText(text);
}

placeRequest.onload = () => {
  console.log(placeRequest.response)
  place = ranElementOfArr(placeRequest.response.agencies);
  changeText(text);
}



}


function changeText(text){
  text.innerHTML = `${condiment} ${verb} is what would happen if a ${article} ${characterArchetype} met a ${mood} ${celebrity} at the ${place}`;
  console.log(`${condiment} ${verb} is what would happen if a ${article} ${characterArchetype} met a ${mood} ${celebrity} at the ${place}`);
}

  // JSON.parse();
