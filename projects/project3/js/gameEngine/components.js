'use strict';

class Component {
  constructor(){
    this.name = null;
    this.htmlElements = []; //array of html elements, used for all html elements the component has, used for removing them on deletion of an entity
  }
  removeHtml(){

  }
}

class cPos extends Component { //stores position
  constructor(angle=0,x=0,y=0,z=0){
    super();
    this.name = 'cPos';
    this.x = x;
    this.y = y;
    this.z = z;
    this.angleX = angle;
    this.angleY = angle;
    this.angleZ = angle;
  }
}

class cMesh extends Component { //stores verts,faces,distances,colors of a mesh...
  constructor(objBlob){
    super();
    this.name = 'cMesh';
    this.camToCenter = undefined; //how far is meshes distToCamera in worldview
    this.opacity = 1;

    this.verts = objBlob.verts.slice();
    this.vertStores = this.verts.slice();
    this.vertsTransformed = new Array(this.verts.length); //verts but rotated and also homo coords [x,y,z,w]
    for (let i = 0; i < this.vertsTransformed.length; i++) { //rgb
      this.vertsTransformed[i] = new Array(4);
    }

    this.vertNorms = objBlob.vertNorms.slice(); //arr of vertex normals
    this.camToVerts = new Array(this.verts.length); //vector       from camera to all vertexes
    this.camToVertsMag = new Array(this.verts.length); //magnitude from camera to all vertexes

    this.faces = objBlob.faces.slice();
    this.camToFaces = new Array(this.faces.length); // avg pos of face - camera pos = vec to faceCenter from camera
    this.camToFacesMag = new Array(this.faces.length);

    this.faceColors = new Array(this.faces.length);
    for (let i = 0; i < this.faces.length; i++) { //rgb
      this.faceColors[i] = [ran(255),ran(255),ran(255),1];
    }

    this.shading = true;

  }
  scale(amountToScale){
    for (let i = 0; i < this.verts.length; i++){
      this.verts[i] = scalarVecMult(amountToScale,this.vertStores[i]);
    }
  }
  faceColor(color){
    for (let i = 0; i < this.faceColors.length; i++) { //rgb
      this.faceColors[i] = color;
    }
  }
}

class cPlayer extends Component { //input moves any entities with cPlayer, and transforms camera to their pos
  constructor(camera = false){
    super();
    this.name = 'cPlayer';
  }
}

class cRotUI extends Component { //input moves any entities with cPlayer, and transforms camera to their pos
  constructor(camera = false){
    super();
    this.name = 'cRotUI';
  }
}

class cPhysics extends Component {
  constructor(mass=null, xVel=0,yVel=0,zVel=0, angularVelX=0,angularVelY=0,angularVelZ=0, inert = false){
    super();
    this.name = 'cPhysics';
    this.mass = mass;
    this.invMass = 1/mass; //inverse mass
    this.momentOfInertia = 0.0012; //how easily this object is rotated
    this.vel = new Vector3D(xVel,yVel,zVel);
    this.angularVel = new Vector3D(angularVelX,angularVelY,angularVelZ);
    this.angularVel.mult(g.physics.polarDrag)
    this.inert = inert;
    this.restitution = 0.8; //bouncyness or % force transferred in collisions, 1 = bouncy, 0=not
    if (mass===null){console.log('mass not set, define by cCollision as PI r ^2');}
  }
}
