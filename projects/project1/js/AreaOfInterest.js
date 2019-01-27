/*
responsible for storing all strings within a given area, and knowing how many characters
in total it contains.
This is so the camera musn't itterate over all strings in the scene (which would
be expensive) to find areasOfInterest close enough to be of influence to the camera,
then when cam finds areasOfInterest close enough to matter it can itterate through individual strings
*/
class AreaOfInterest{
  constructor(string,x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strings = [];
    this.strings.push(string);
    this.containedCharacters = string.length;
  }

  calculateCharactersContained(){
    this.containedCharacters = 0;
    for (let string of this.strings){ //add up all characters in every string
      this.containedCharacters += string.length;
    }
  }
}
