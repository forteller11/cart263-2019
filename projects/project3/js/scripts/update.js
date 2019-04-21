function update(){
  //fill screen with yellow
  ctx.fillStyle = cssRGBA(bgColor);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  //update all systems
  systemManager.update();
}
