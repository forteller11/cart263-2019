"use strict";

window.onload = main;

function main(){
  let jsonUrl = 'https://raw.githubusercontent.com/pippinbarr/cart263-2019/master/activities/data/condiments/data/data.json';
  let request = new XMLHttpRequest();
  request.open('GET',jsonUrl); //open/setup request
  request.responseType = 'json';
  request.send();

let verb = 'is';
let condiment = null;

  request.onload = () => {
    const condiments = request.response.condiments;
    console.log(condiments);
    console.log(ranIndexOfArr(condiments));
    condiment = condiments[ranIndexOfArr(condiments)];
    if (condiment[condiment.length-1] === 's'){
      verb = 'are';
    }
    console.log('wooo');
  console.log(condiment);
  console.log(verb);
  }



  // JSON.parse();

}
