class Particle {
  constructor(string, charSize, x, y, initialVelX, initialVelY) {
    this.element = document.createElement("span");
    this.element.innerHTML = string;
    this.element.style.position = "absolute";
    this.element.style.fontSize = charSize + "px";
    this.opacity = 1;
    this.opacityFade = randomRange(-0.0001,-0.00001)
    body[0].appendChild(this.element);
    this.charSize = charSize + "px";

    this.x = x;
    this.y = y;

    this.element.style.left = (this.x) + "px";
    this.element.style.top = (this.y) + "px";

    this.velocity = new Vector(initialVelX,initialVelY);
    this.drag = 1.05;
  }
  update() {
      this.opacity += this.opacityFade;
      this.element.style.opacity = this.opacity;
      this.velocity.div(this.drag);
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      this.element.style.left = (this.x) + "px";
      this.element.style.top = (this.y) + "px";
      }

  deleteElement(){
    this.element.remove();
  }
}
