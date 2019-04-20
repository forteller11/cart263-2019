function update(){
  ctx.fillStyle = cssRGBA(bgColor);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  systemManager.update();
}
