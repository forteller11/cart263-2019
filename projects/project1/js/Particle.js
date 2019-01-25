class Particle {
  constructor(string, charSize, x, y, initialVelX, initialVelY) {
    this.element = document.createElement("span");
    this.element.innerHTML = string;
    this.element.style.position = "absolute";
    body[0].appendChild(this.element);
    this.charSize = charSize;

    this.x = x;
    this.y = y;
    console.log("IM X"+x);
    this.element.style.left = (this.x) + "px";
    this.element.style.top = (this.y) + "px";

    this.velocity = new Vector(initialVelX,initialVelY);
    this.drag = 1.05;
  }
  update() {
    this.velocity.div(this.drag);
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.element.style.left = (this.x) + "px";
    this.element.style.top = (this.y) + "px";
  }
}
