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

      highlightCorrectAnswer();
      if (this.answer){
        console.log('RIGHT ANSWER');
        score++;
      } else {
        console.log('WRONG ANSWER');
        score --;
      }
      scoreDiv.innerHTML = score;
      setTimeout(()=>{
      removeDivs();
      newRound();
    },1500);
    })

  }
}
