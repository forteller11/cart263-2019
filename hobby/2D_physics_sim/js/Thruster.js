"use strict";
class Thruster extends Component{
  constructor(parent, x, y, angle, radius, density){
    super(parent, x, y, angle, radius, density);
    this.thrustForce = this.radius*.001;
  }

  display(){
    stroke(255);
    strokeWeight(2);
    fill(255,100,100);
    ellipse(this.x,this.y,this.radius*2);
    let xx = (cos(this.angle+this.parent.angle)*this.radius) + this.x;
    let yy = (sin(this.angle+this.parent.angle)*this.radius) + this.y;

    line(this.x,this.y,xx,yy);
    }
}
