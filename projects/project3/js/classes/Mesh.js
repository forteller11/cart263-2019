class Mesh {
  constructor(objBlob) {
    this.verts = objBlob.verts; //array of vertexes in format x,y,z,x,y,z....
    this.vertNorms = objBlob.vertNorms; //arr of vertex normals
    this.faces = objBlob.faces; //arr with indexes of vertices which make up a face, each face has 3 vertices, a,b,c (mult by 3 to get exact index in vert array)
    this.facesDistToCamera = [] //dist of face1, distOfFace2

    this.xAngle = 0; //used to keep track of rotation 'bout the x axis
    this.yAngle = 0; //used to keep track of rotation 'bout the y axis
    this.zAngle = 0; //used to keep track of rotation 'bout the z axis
}

  distBetweenFacesAndPoint(point){ //calculate distances between faces and an arbitrary pos/point in 3D space
    //point = [x,y,z]
    console.log('faceslength=='+this.faces.length);
    for (let i = 0; i < this.faces.length/3; i ++){ //first find position of face by averaging the position of the vertices which make it up

      const avgX = mean(this.vertData(i,0,'x'), this.vertData(i,1,'x'), this.vertData(i,2,'x')); //avg x of vecs which make up face
      const avgY = mean(this.vertData(i,0,'y'), this.vertData(i,1,'y'), this.vertData(i,2,'y')); //avg y of vecs which make up face
      const avgZ = mean(this.vertData(i,0,'z'), this.vertData(i,1,'z'), this.vertData(i,2,'z')); //avg z of vecs which make up face

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

  vertData(face,vert,component){
    //finds the element in verts array which corresponds to a
    //given component of a vertex of a face

    const faceIndex = (face)*3;
    const vertIndex = (vert);

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
    if (vert > 2){ console.log('ERROR: inputs too large at vertComponent')};

//     console.log(`vertIndexData: ${this.faces[faceIndex + vertIndex]*3}
// vertData: ${this.verts[this.faces[faceIndex + vertIndex]*3 + componentIndex]}`);
    return this.verts[this.faces[faceIndex + vertIndex]*3 + componentIndex];
  }

}
