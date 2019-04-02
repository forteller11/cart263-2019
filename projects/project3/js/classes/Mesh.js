class Mesh {
  constructor(objBlob) {
    this.verts = objBlob.verts; //array of vertexes in format x,y,z,x,y,z....
    this.vertNorms = objBlob.vertNorms; //arr of vertex normals
    this.faces = objBlob.faces; //arr with indexes of vertices which make up a face, each face has 3 vertices, a,b,c (mult by 3 to get exact index in vert array)
    this.facesDistToCamera = [] //dist of face1, distOfFace2
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
  distBetweenFacesAndPoint(point){ //calculate distances between faces and an arbitrary pos/point in 3D space
    //point = [x,y,z]
    for (let i = 0; i < this.verts.length; i ++){ //first find position of face by averaging the position of the vertices which make it up
      const ii = i*9; //faces are 9 indices away from eachother

      const avgX = mean(this.verts[ii+0+0], this.verts[ii+0+3], this.verts[ii+0+6]); //avg x of vecs which make up face
      const avgY = mean(this.verts[ii+1+0], this.verts[ii+1+3], this.verts[ii+1+6]); //avg y of vecs which make up face
      const avgZ = mean(this.verts[ii+2+0], this.verts[ii+2+3], this.verts[ii+2+6]); //avg z of vecs which make up face

      this.facesDistToCamera[i] = this.distToCamera = pythag(point[0]-avgX, point[1]-avgY, point[2]-avgZ);
    }
  }
  sortFacesByDistanceToPoint(point){

    this.distBetweenFacesAndPoint(point); //calc facesDistToCamera

    let f = this.faces;
    let fDist = this.facesDistToCamera;

    for (let i = 1; i < this.faces.length; i ++){ //sorts from largest to smallest: insertion sort (very quick for  smaller arrays and already heavily sorted arr (linear speed for fully sorted)) (?)
      let j = i;
      while ((j > 0) && (fDist[i] > fDist[j])){ //itterate backwards through array until find an element which is smaller then index
        j--;
      }
      //swap
      let fStore = f[i];
      f[i] = f[j];
      f[j] = fStore;
    }
  }


}
