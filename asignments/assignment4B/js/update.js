function update(){

if (mouseHistX.length < mouseHistMaxLength){ //store mouse positions every frame
  mouseHistX.push(mouseMoveStoreX);
  mouseHistY.push(mouseMoveStoreY);
} else { //remove oldest, add newest pos
  mouseHistX.splice(0,1);
  mouseHistY.splice(0,1);
  mouseHistX.push(mouseMoveStoreX);
  mouseHistY.push(mouseMoveStoreY);
}

if (!(mouseDragIndex === null)){ //move entity if dragging === true
  circles[mouseDragIndex].x = mouseMoveStoreX + mouseEntityDragOffsetX;
  circles[mouseDragIndex].y = mouseMoveStoreY + mouseEntityDragOffsetY;
}
  // console.log('update');
  for (let i = 0; i < circles.length; i++){
    for (let j = i+1; j < circles.length; j ++){ //might go out of scope of array depending on if check or execution happens first
      entityCollision(circles[i],circles[j]);
    }
    circles[i].update();
  }
}
