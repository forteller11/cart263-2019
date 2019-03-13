'use strict';

class cPos { //stores position
  constructor(angle=0,x=0,y=0,z=0){
    this.name = 'cPos';
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

class cHitbox{ //circle hitbox
  constructor(radius,type='circle'){
    this.name = 'cHitbox';
    this.radius = radius;
    this.type = type; //can be 'circle',boundingbox,(polygon)
  }
}

class cPhysics {
  constructor(mass=null,xVel=0,yVel=0,angularVel=0){
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

class cImage { //contains html image element
  constructor(imgUrl=null,sizeOfImage=null,depth = 0){
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

class cEmbedVideo { //contains html image element
  constructor(videoId=null,sizeOfImage=null,depth = 0){
    this.name = 'cImage';
    this.image = document.createElement('IMG');
    this.image.src = imgUrl;
    this.image.style.position = 'fixed';
    this.image.width = sizeOfImage;
    this.image.height = sizeOfImage;
    this.image.style.zIndex = depth;
    body.appendChild(this.image);

    if (sizeOfImage === null){console.log('videoID === null');}
    if (sizeOfImage === null){console.log('size of image === null, set to cHitbox.radius*2');}
  }
}

class cHtmlDisplay{
  constructor(type,args...){
    this.name = 'cHtmlDisplay';
    this.type = type;
    this.link = null;
    if (args.length > 0){
      this.link = args[0]
    } else {console.log('need a link paramter in cHtmlDisplay!')}

    this.args = args; //array of arguments


    let elementWidth; //used to detmine width of display element
    let elementHeight; //used to detmine height of display element

    switch(args.length){
      case 1: //default values for width/height
        elementWidth = 264;
        elementHeight = 264;
        break;
      case 2: //width === height
        elementWidth = args[1];
        elementHeight = args[1];
        break;
      case 3: //width and height have unique arguments
        elementWidth = args[1];
        elementHeight = args[2];
      default:
        console.log('wrong number of arguments in cHtmlDisplay constructor!')
    }

//this span will act as the standard point of contact to any systems who need to care about
//cHtmlDisplay irrespective of the fed "type" argument
    this.span = document.createElement('span');
    this.span.style.position = 'fixed';
    this.span.style.width = elementWidth+'px';
    this.span.style.height = elementHeight+'px';
    this.span.style.zIndex = 0;
    document.body.appendChild(this.span);

    switch(this.type){
      case 'image': //default values for width/height
      this.image = document.createElement('IMG');
      this.image.src = imgUrl;
      this.image.style.position = 'absolute';
      this.image.width = sizeOfImage;
      this.image.height = sizeOfImage;
      this.image.style.zIndex = 0;
      body.appendChild(this.image);
        break;

      case 'embedVideo': //width === height
      this.iframe = document.createElement('IFRAME');
        this.iframe.src = "https://www.youtube.com/embed/"+id+"?autoplay=1&controls=0&showinfo=0&modestbranding=1&autohide=1&loop=1&disablekb=1&enablejsapi=1";
        console.log(this.iframe.src);
        this.iframe.height = videoHalfSideLength;
        this.iframe.width =  'auto';
        this.iframe.style.position = 'absolute';
        this.iframe.style.top = -borderRadius/10+'px'
        this.iframe.style.left = -borderRadius/3+'px';
        this.iframe.seamless = true;
        this.iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        this.iframe.allowfullscreen = 'false'
        this.iframe.style.border = 'none'
        this.iframe.mute = false;
        this.span.appendChild(this.iframe);
        console.log(this.iframe);

        let this.clickCover = document.createElement('IMG');
        this.clickCover.src = 'assets/placeholder.jpg';
        this.clickCover.style.position = 'absolute';
        this.clickCover.style.top = -borderRadius/10+'px'
        this.clickCover.style.left =  0+'px'
        this.clickCover.style.width = videoHalfSideLength+'px';
        this.clickCover.style.height = videoHalfSideLength+'px';
        this.clickCover.style.zIndex = 10; //cover other elements
        this.span.appendChild(this.clickCover);
        break;

      default:
        console.log(this.type + ' is not a valid type in cHtmlDisplay!')
    }






  }
}

class cDraggable{
  constructor(drag=true){
    this.name = 'cDraggable';
    this.draggable = drag;
  }
}

class cDragArea{
  constructor(value=false){
    this.name = 'cDragArea';
    this.value = value;
  }
}
