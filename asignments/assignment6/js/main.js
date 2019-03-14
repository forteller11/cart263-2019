"use strict";

window.onload = main;

function main(){
  let jsonUrl = 'https://raw.githubusercontent.com/pippinbarr/cart263-2019/master/activities/data/condiments/data/data.json';
  let request = new XMLHttpRequest();
  request.open('GET',jsonUrl);
  request.responseType = 'json';
  request.send();

  request.onload = () => {
    console.log(request.response);
  }
  // JSON.parse();

}
