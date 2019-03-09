class Choice{
  constructor(x=window.innerWidth/2,y=window.innerHeight/2,index=0,answer=false){
    this.x = x;
    this.y = y;
    this.answer = answer; //is this the choice the correct answer;
    this.div = document.createElement('DIV');
    this.div.style.position = 'fixed';
    this.div.width = 'auto';
    this.div.height = 'auto';
    this.div.style.left = this.x+'px';
    this.div.style.top = this.y+'px';
    this.div.innerHTML = animals[index];
    body.appendChild(this.div);
    this.animal = animals[index];
    this.animalReversed = reverseString(animals[index]);

    this.div.addEventListener('mousedown',()=>{
      this.chosen();
    });
  }

    chosen(){
      console.log('i am chosen');
      attempts ++;
      if (attempts > attemptsMax){
        transitionRound();
      }

      if (this.answer){
        console.log('RIGHT ANSWER');
        responsiveVoice.speak("wow, good job!","UK English Male", {rate: 1});
        transitionRound();
        score++;

      }

      else {
        this.div.style.color = 'red';
        console.log('WRONG ANSWER');
        responsiveVoice.speak(choices[answerIndex].animalReversed,"UK English Male", {rate: 1/(attempts+1)});
        score -= attempts/2;
      }
      scoreDiv.innerHTML = score;
    }


}
