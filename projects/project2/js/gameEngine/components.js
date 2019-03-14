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
    this.angle = angle;
  }
}

class cHitbox extends Component{ //circle hitbox
  constructor(radius,type='circle'){
    super();
    this.name = 'cHitbox';
    this.radius = radius;
    this.type = type; //can be 'circle',boundingbox,(polygon)
  }
}

class cPhysics extends Component {
  constructor(mass=null,xVel=0,yVel=0,angularVel=0){
    super();
    this.name = 'cPhysics';
    this.mass = mass;
    this.invMass = 1/mass; //inverse mass
    this.momentOfInertia = 0.0012; //how easily this object is rotated
    this.vel = new Vector(xVel,yVel);
    this.angularVel = angularVel;
    this.restitution = 0.8; //bouncyness or % force transferred in collisions, 1 = bouncy, 0=not
    if (mass===null){console.log('mass not set, define by cCollision as PI r ^2');}
  }
}

class cImage extends Component { //contains html image element
  constructor(imgUrl=null,sizeOfImage=null,depth = 0){
    super();
    this.name = 'cImage';
    this.image = document.createElement('IMG');
    this.image.src = imgUrl;
    this.image.style.position = 'fixed';
    this.image.width = sizeOfImage;
    this.image.height = sizeOfImage;
    this.image.style.zIndex = depth;
    body.appendChild(this.image);

    if (sizeOfImage === null){console.log('imgUrl === null');}
    if (sizeOfImage === null){console.log('size of image=== null, set to cHitbox.radius*2');}
  }
}



class cHtmlDisplay extends Component{
  constructor(type,...args){
    super();
    this.name = 'cHtmlDisplay';
    this.type = type;
    this.link = null;
    if (args.length > 0){
      this.link = args[0]
    } else {console.log('need a link paramter in cHtmlDisplay!')}

    this.args = args; //array of arguments


    this.width; //used to detmine width of display element
    this.height; //used to detmine height of display element

    switch(args.length){
      case 1: //default values for width/height
        this.width = 264;
        this.height = 264;
        break;
      case 2: //width === height
        this.width = args[1];
        this.height = args[1];
        break;
      case 3: //width and height have unique arguments
        this.width = args[1];
        this.height = args[2];
      default:
        console.log('wrong number of arguments in cHtmlDisplay constructor!')
    }

//this span will act as the standard point of contact to any systems who need to care about
//cHtmlDisplay irrespective of the fed "type" argument
    this.span = document.createElement('span');
    this.span.style.position = 'fixed';
    this.span.style.width = this.width+'px';
    this.span.style.height = this.height+'px';
    this.span.style.zIndex = 0;
    this.span.style.left = '400px';
    this.span.style.top = '64px';
    document.body.appendChild(this.span);

    switch(this.type){
      case 'image': //default values for width/height
      this.image = document.createElement('IMG');
      this.image.src = this.link;
      this.image.style.position = 'absolute';
      this.image.width = this.width;
      this.image.height = this.height;
      this.image.style.zIndex = 0;
      this.span.appendChild(this.image);
        break;

      case 'embedVideo': //width === height
        this.span.style.borderRadius = '100%';
        this.span.style.overflow = 'hidden';

        const xx = 0 + 'px';
        const yy = 0 + 'px';

        const w = this.width+'px';
        const h = this.height+'px';


        this.iframe = document.createElement('IFRAME');
        this.iframe.src = "https://www.youtube.com/embed/"+this.link+"?autoplay=1&controls=0&showinfo=0&modestbranding=1&autohide=1&loop=1&disablekb=1&enablejsapi=1";
        console.log(this.iframe.src);
        this.iframe.style.position = 'absolute';
        this.iframe.height = h;
        this.iframe.width =  w;
        this.iframe.style.top = yy;
        this.iframe.style.left = xx;
        this.iframe.seamless = true;
        this.iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        this.iframe.allowfullscreen = 'false'
        this.iframe.style.border = 'none'
        this.iframe.mute = false;
        this.span.appendChild(this.iframe);
        console.log(this.iframe);

        this.clickCover = document.createElement('IMG');
        this.clickCover.src = 'assets/placeholder.jpg';
        this.clickCover.style.position = 'absolute';
        this.clickCover.style.top = yy;
        this.clickCover.style.left =  xx;
        this.clickCover.style.width = w;
        this.clickCover.style.height = h;
        this.clickCover.style.opacity = 0.0;
        this.clickCover.style.zIndex = 10; //cover other elements
        this.span.appendChild(this.clickCover);
        break;

      default:
        console.log(this.type + ' is not a valid type in cHtmlDisplay!')
    }
  }

  removeHtml(){ //removes html from component
    switch(this.type){

      case 'image':
        this.span.remove();
        break;
      
      case 'embedVideo':
        this.iframe.remove();
        this.clickCover.remove();
        this.span.remove();
        break;

    }
  }
}

class cDraggable  extends Component{
  constructor(drag=true){
    super();
    this.name = 'cDraggable';
    this.draggable = drag;
  }
}

class cDragArea  extends Component{
  constructor(value=false){
    super();
    this.name = 'cDragArea';
    this.value = value;
  }
}
