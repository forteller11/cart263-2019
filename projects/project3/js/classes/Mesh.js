class Mesh {
  constructor(objBlob) {
    this.verts = objBlob.verts; //array of vertexes
    this.vertNorms = objBlob.vertNorms; //arr of vertex normals
    this.faces = objBlob.faces; //arr of objects with 3 vertexes that make them up and avg pos
}
  rotate(zAxis, yAxis, xAxis) {
    //basis vectors
    // let iHat = new Vector(1,0,0);
    // let jHat = new Vector(0,1,0);
    // let kHat = new Vector(0,0,1);
    //
    // iHat.rotate(xx);
    // jHat.rotate(yy);
    // jHat.rotate(yy);
    //
    for (let i = 0; i < this.verts; i++) {
      //represent vector as linear transformation of basis
      this.verts[i].rotateZ(zAxis);
      this.verts[i].rotateY(yAxis);
      this.verts[i].rotateX(xAxis);
    }
  }

  rotateX(rotateAmount) {
    for (let vec of this.verts) {
      vec.rotateX(rotateAmount);
    }
  }

  rotateY(rotateAmount) {
    for (let vec of this.verts) {
      vec.rotateY(rotateAmount);
    }
  }
  rotateZ(rotateAmount) {
    for (let vec of this.verts) {
      vec.rotateZ(rotateAmount);
    }
  }

  sortFacesByDistanceToPoint(camO){
    //itterate through array, calc dist to point, save it in other array,
    let f = this.faces;
    f[0].distTo(camO);
    
    for (let i = 1; i < this.faces.length; i ++){ //sorts from largest to smallest
      let j = i;
      while ((j > 0) && (f[i].distTo(camO) > f[j].distTo(camO))){
        j--;
      }
      //swap
      let fStore = f[i];
      f[i] = f[j];
      f[j] = fStore;

    }
  }


}
