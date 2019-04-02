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
    console.log('faceslength=='+this.faces.length);
    for (let i = 0; i*3 < this.faces.length; i ++){ //first find position of face by averaging the position of the vertices which make it up
      let ii = i*3*3;
      //index in this.verts array for current face
      let v1Index = this.faces[ii+0]; //vertice 1 of face
      let v2Index = this.faces[ii+3]; //vertice 2 of face
      let v3Index = this.faces[ii+6]*6; //vertice 3 of face
      console.log(this.vertComponent(2,2,'y'));
      console.log(`${v1Index}, ${v2Index}, ${v3Index}`);
      const avgX = mean(this.verts[v1Index+0+0],this.verts[v1Index+0+3],this.verts[v1Index+0+6]); //avg x of vecs which make up face
      const avgY = mean(this.verts[v1Index+1+0],this.verts[v1Index+1+3],this.verts[v1Index+1+6]); //avg y of vecs which make up face
      const avgZ = mean(this.verts[v1Index+2+0],this.verts[v1Index+2+3],this.verts[v1Index+2+6]); //avg z of vecs which make up face

      console.log(`${this.verts[v1Index+0+0]}, ${this.verts[v1Index+1+0]}, ${this.verts[v1Index+2+0]}`);
      this.facesDistToCamera[i] = pythag(point[0]-avgX, point[1]-avgY, point[2]-avgZ);
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

  vertComponent(face,vert,component){
    //finds the element in verts array which corresponds to a
    //given component of a vertex of a face

    const faceIndex = (face-1)*3;
    const vertIndex = (vert-1);

    let componentIndex; //convert string x,y,z to number
    switch(component){
      case 'x': componentIndex = 0;
        break;
      case 'y': componentIndex = 1;
        break;
      case 'z': componentIndex = 2;
        break;
      default: console.log('ERROR: wrong input at method vertComponent');
        break
    }
    if (vert > 3){ console.log('ERROR: inputs too large at vertComponent')};

    // componentIndex = 0;

    return this.verts[this.faces[faceIndex + vertIndex]*3 + componentIndex];
  }

}
