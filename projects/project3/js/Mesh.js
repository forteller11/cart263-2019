class Mesh {
constructor(objBlob){
    this.verts = objBlob.verts; //array of vertexes
    this.vertNorms = objBlob.vnArr; //arr of vertex normals
    this.faces = objBlob.fArr; //arr of arr of connected vectors which make up a single face (3 verts per side)
  }

  rotate(xx,yy){
    //basis vectors
    let iHat = new Vector(1,0,0);
    let jHat = new Vector(0,1,0);
    let kHat = new Vector(0,0,1);

    iHat.rotate(xx);
    jHat.rotate(yy);
    jHat.rotate(yy);
    
    for (let i = 0; i < this.verts; i+=3){
      //represent vector as linear transformation of basis
      this.verts[i]/ iHat
    }
    //figure out how vec is linear transformation of basis,

    //rotate basis,

    //mult vec by that value


    //transformed basis vecs

    //result in change
  }
}
