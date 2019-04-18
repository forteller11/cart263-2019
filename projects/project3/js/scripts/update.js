function update(){
  ctx.fillStyle = cssRGBA([255,255,255,.5]);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  systemManager.update();
}
