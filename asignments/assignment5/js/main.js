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
  if (annyang){
    annyang.removeCommands(); //clean slate
    let commands = {'begin':(animalName)=>{
      beginText.remove();
      newRound();
      gameStart = true;
  }};
    //i choose... name, then cycles through all choices until it finds matching name, then it sees if answer...
    annyang.addCommands(commands);
    annyang.start();
}
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

annyang.start();
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

console.log(annyang);
if (annyang){
  annyang.removeCommands(); //clean slate
  let commands = {'I think it is *animal':(animalName)=>{
    const indexOfName = matchIndexToName(animalName);
    if (indexOfName===null){
      responsiveVoice.speak("speak with clarity","UK English Male", {rate: 1});
    } else {
      console.log(choices[indexOfName]);
      choices[indexOfName].chosen();
      console.log(animalName);
    }
},
'I give up':()=>{
  transitionRound();
  responsiveVoice.speak("the answer was "+choices[answerIndex].animal,"UK English Male", {rate: 1});
  score--;
},
'Say it again':()=>{
  responsiveVoice.speak(choices[answerIndex].animalReversed,"UK English Male", {rate: 1});
}
}
  //i choose... name, then cycles through all choices until it finds matching name, then it sees if answer...
  annyang.addCommands(commands);
  annyang.start();
}
// let commandIGiveUp = {'I give up': transitionRound};
// annyang.init(commandIGiveUp,true);
// annyang.start({ autoRestart: true });
}

function matchIndexToName(name){
  const nameLowerCase = name.toLowerCase();
  for (let i = 0; i < choices.length; i ++){
    console.log(nameLowerCase + choices[i].animal);
    if (nameLowerCase === choices[i].animal){
      console.log('index === '+i);
      return i;
    }
  }
  return null;
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

function transitionRound(){
  highlightCorrectAnswer();
  setTimeout(()=>{newRound();},2000);
}
//create choice object which has
