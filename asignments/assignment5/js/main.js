"use strict";

window.onload = main;
let body;
let scoreDiv;
let animals = [];
let gameStart = false;
let score = 0;
let choices = [];
let attempts;
const attemptsMax = 2;
let answerIndex;

function main(){
    body = document.getElementById('body');
  clickToBegin();
  animals = animalArray();
}

function clickToBegin(){
  console.log('clicktobegin');
  let beginText;
  beginText = document.createElement('DIV');
  beginText.style.position = 'fixed';
  beginText.width = 'auto';
  beginText.height = 'auto';
  beginText.style.left = window.innerWidth/2+'px';
  beginText.style.top = window.innerHeight/2+'px';
  beginText.innerHTML = 'CLICK TO BEGIN';
  body.appendChild(beginText);

  scoreDiv = document.createElement('DIV');
  scoreDiv.style.position = 'fixed';
  scoreDiv.width = 'auto';
  scoreDiv.height = 'auto';
  scoreDiv.style.left = 64+'px';
  scoreDiv.style.top = 32+'px';
  scoreDiv.innerHTML = score;
  body.appendChild(scoreDiv);

  document.addEventListener('mousedown',()=>{
    if (gameStart===false){
      beginText.remove();
      newRound();
      gameStart = true;
    }
  });
}

function newRound(){

  removeDivs();
  let choicesPerRound = 6;
  answerIndex = Math.floor(ran(choicesPerRound-.0001)); //index of choice which is the right answer
  let spaceBetweenEachOption = window.innerHeight/choicesPerRound+2; //+2 to account for borders
  //make text with width of
  const xO = window.innerWidth/2;
  const yO = spaceBetweenEachOption/2.5;
  for (let i = 0; i < choicesPerRound; i ++){
    let answer;
    if (answerIndex === i) { answer = true;}
    else {answer = false;}
    const y = yO + (spaceBetweenEachOption*i);
    const index = Math.floor(ran(animals.length-.00001));
    choices[i] = new Choice(xO,y,index,answer);
  }
    responsiveVoice.speak(choices[answerIndex].animalReversed,"UK English Male", {rate: 1/(attempts+1)});
  console.log(choices);
console.log('newRound')
}

function reverseString(string){
  attempts = 0;
  let reversedArr = [];
  for (let i = string.length-1; i >= 0; i --){
    reversedArr.push(string[i]);
  }
  const reversedString = reversedArr.join('');
  return reversedString;
  //write algorithim
}

function highlightCorrectAnswer(){
  console.log(choices);
  for (let i = 0; i < choices.length; i ++){
    if (choices[i].answer){ choices[i].div.style.backgroundColor = "yellow"}
    else { choices[i].div.style.color = 'red'}
  }
}

function removeDivs(){
  console.log('removedivs');
  for (let i = 0; i < choices.length; i ++){
    choices[i].div.remove();
    choices[i] = null;
  }
}
//create choice object which has
