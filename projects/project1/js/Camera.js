class Camera{
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;

    this.toTargetMovespeed = .01 * updateTime;
    this.toTargetMaxMovespeed = Infinity;
    this.targetX = this.x;
    this.targetY = this.y;

  }
  update(){
    this.setTarget();
    this.moveTowardsTarget();
  }
  setTarget(){
    this.targetX = player.x - window.innerWidth/2;
    this.targetY = player.y - window.innerHeight/2;
    // this.targetX = 0;
    // this.targetY = 0;
  }
  moveTowardsTarget(){
    //find difference between target and current position
    const deltaX = this.targetX-this.x;
    const deltaY = this.targetY-this.y;
    //use percentage of that delta to find movespeed in pixels
    let moveX = deltaX*this.toTargetMovespeed;
    let moveY = deltaY*this.toTargetMovespeed;
    //constrain that movespeed to set bounds in pixels
    moveX = constrain(moveX,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
    moveY = constrain(moveY,-this.toTargetMaxMovespeed,this.toTargetMaxMovespeed);
    //actually moved based on these calculations...
    this.x += moveX;
    this.y += moveY;
  }
}
