class Mesh {
  constructor(objBlob) {
    this.verts = objBlob.verts; //array of vertexes in format x,y,z,x,y,z....
    this.vertsDistToCamera = []; //array of how far the vert is away from the camera [distForxyz,distForv2,v3,v4...]

    this.vertNorms = objBlob.vertNorms; //arr of vertex normals

    this.faces = objBlob.faces; //arr with indexes of vertices which make up a face, each face has 3 vertices, a,b,c (mult by 3 to get exact index in vert array)
    this.facesDistToCamera = [] //dist of face1, distOfFace2
    this.facesR = [];
    this.facesG = [];
    this.facesB = [];
    for (let i = 0; i < this.faces.length; i++){
      this.facesR[i] = ran(255);
      this.facesG[i] = ran(255);
      this.facesB[i] = ran(255);
    }

    this.xAngle = 0; //used to keep track of rotation 'bout the x axis
    this.yAngle = 0; //used to keep track of rotation 'bout the y axis
    this.zAngle = 0; //used to keep track of rotation 'bout the z axis
}

  distBetweenFacesAndPoint(point){ //calculate distances between faces and an arbitrary pos/point in 3D space
    //point = [x,y,z]

    for (let i = 0; i < this.verts.length/3; i++){ //calc vertDistoCamera for every vertice
      let ii = i*3;
      this.vertsDistToCamera[i] = pythag(point[0]-this.verts[ii+0], point[1]-this.verts[ii+1], point[2]-this.verts[ii+2]);
    }
    for (let i = 0; i < this.faces.length/3; i ++){ //find avg dist of every face from camera by avging it's avg vertDistToCamera
      this.facesDistToCamera[i] = mean(this.vertDistData(i,0), this.vertDistData(i,1), this.vertDistData(i,2));
    }
  }

  sortFacesByDistanceToPoint(point){

    this.distBetweenFacesAndPoint(point); //calc facesDistToCamera

    for (let i = 1; i < this.faces.length; i ++){ //sorts from largest to smallest: insertion sort (very quick for  smaller arrays and already heavily sorted arr (linear speed for fully sorted)) (?)
      let j = i;
      while ((j > 0) && (this.facesDistToCamera[i] > this.facesDistToCamera[j])){ //itterate backwards through array until find an element which is smaller then index
        j--;
      }
      //swap
      let fStore = this.faces[i];
      this.faces[i] = this.faces[j];
      this.faces[j] = fStore;
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

  vertDistData(face,vert){
    //finds the element in vertDistToCamera array which corresponds to
    //a givens face's vert's dist between vert-camera

    const faceIndex = (face)*3;
    const vertIndex = (vert);

    return this.vertsDistToCamera[this.faces[faceIndex + vertIndex]];
  }

}
