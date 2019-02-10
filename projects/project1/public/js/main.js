"use strict";
window.onload = initialiseScene;
let textboxes = []; //the html textinput elements which represent the clients and can spawn spans
let spans = []; //the html elements which contianer the innerHTML which arise from any entered msgs
let camera; //follows the player around smoothly

let sessionID; //unique identifier of specefic client-server connections
let socket; //the object containing the data of the unique client-server connection

const updateTime = 16.7; //~60fps
let mouseX = 0; //track mouseX/Y globally
let mouseY = 0;
const charSize = 16; //fontSize
const lineSpace = 32; //when users press enter how far the textbox travels vertically
const letterKerningSpace = 2; //space inbetween letters
let body = document.getElementsByTagName("body"); //to be used as a pointer to append any created html elements via js
let initialisedWorld = false; //has the world been initialised for this client already?

/*
Initialise Scene creates socket connection between server, and is responsible
for waiting on server to send it all existing objects (spans and textboxes)
in the scene if there are any,
*/
function initialiseScene() {

  document.addEventListener("mousemove", trackMouseMovement); //vegin tracking mouseMovmenet and storing them in global vars

  socket = io.connect('http://localhost:3000'); //connect to server

  socket.on('connect', () => { //on connection w/server...
    console.log('connected to server');

    socket.on('textboxSync', (textboxSyncData) => { //wait for data in which to appropriately instatiate textbox objects
      console.log('receiving textbox sync data from server');
      if (initialisedWorld === false) { //if there is data, and this is first time initialising data
        for (let box of textboxSyncData) { //instatiate textboxes based on data from server
          textboxes.push(new Textbox(box.id, box.value, box.x, box.y, box.targetX, box.targetY));
        }
      } else {
        console.log("don't initialise textboxes");
      }
    }); //textbox sync

    socket.on('spanSync', (spanSyncData) => { //wait for data in which to appropriately instantiate spans
      console.log('ah');
      if (initialisedWorld === false) { //if there is data....
        console.log('pushing spans');
        for (let span of spanSyncData) { //instatiate spans based on data from server
          spans.push(new Span(span.string, span.x, span.y, span.opacity));
        }
      } else {
        console.log("don't initialise spans");
      }

      if (initialisedWorld === false) { //if first time connecting, execute setup function
        main();
      }
    }); //span sync
  }); //connection

} //initialiseScene



function main() { //post initialisation begin listening to server for data

  if (initialisedWorld === false) {
    initialisedWorld = true;
    console.log('create new avatar');
    sessionID = socket.id; //unique identifier of this client-server connection (socket)
    console.log('sessionID:' + sessionID);
    let newAvatar = new Avatar(sessionID);

    let newAvatarData = { //create literal object to send to server
      id: newAvatar.id,
      value: newAvatar.element.value,
      x: newAvatar.x,
      y: newAvatar.y
    }
    socket.emit('newTextbox', newAvatarData);
    textboxes.push(newAvatar);

    camera = new Camera(newAvatar); //set camera to follow the most recently pushed player (the avatar)

    update(); //update immediately
    setInterval(update, updateTime); //set update to ~ 60 times a second
  }


  socket.on('newTextbox', (newTextboxData) => { //if cleint receives data that a newtextbox has been created, create one using the data
    console.log('newtextbox connected');
    textboxes.push(new Textbox(newTextboxData.id, newTextboxData.value, newTextboxData.x, newTextboxData.y));
  });


  socket.on('newSpan', (newSpanBlueprintData) => { //if client receives data that a newSpan has been created, create one using data
    console.log('newSpan BlueprintData');
    console.log(newSpanBlueprintData);
    spans.push(new Span(newSpanBlueprintData.string, newSpanBlueprintData.x, newSpanBlueprintData.y));
  });


  socket.on('textboxValueChange', (textboxValueChangeData) => { //if another client's avatar's textinput has changed its value
    for (let i = 0; i < textboxes.length; i++) {
      if (textboxValueChangeData.id === textboxes[i].id) { //find the corresponding textbox in personal array which the value change correspond to
        textboxes[i].element.value = textboxValueChangeData.value; //change the value
        break;
      }
    }
  });


  socket.on('retargeting', (retargetingData) => { //receive retargets from another client
    for (let i = 0; i < textboxes.length; i++) {
      if (retargetingData.id === textboxes[i].id) { //find the corresponding textbox which the retarget belongs to
        textboxes[i].x = retargetingData.x;
        textboxes[i].y = retargetingData.y;
        textboxes[i].targetX = retargetingData.targetX;
        textboxes[i].targetY = retargetingData.targetY;
        break;
      }
    }
  });


  socket.on('requestWorldData', (idData) => { //if a new client jions and the server requests world data
    console.log('WORLD DATA REQUESTED');
    console.log(idData + "===" + sessionID);
    if (idData === sessionID) { //if this is the oldest client currently joined
      //construct blobs which can act as blueprints to reconstruct all data in the scene
      let boxBlueprints = [];
      console.log('textboxes:');
      console.log(textboxes);
      for (let box of textboxes) { //cycle through textboxes in scene
        let data = {
          id: box.id,
          value: box.element.value,
          x: box.x,
          y: box.y,
          targetX: box.targetX,
          targetY: box.targetY
        }
        boxBlueprints.push(data); //push textbox blueprints to one array
      }
      socket.emit('textboxSync', boxBlueprints);
      console.log('textboxSync EMIT');
      console.log(boxBlueprints); //send this array of textbox blueprints to server

      let spanBlueprints = [];
      for (let span of spans) { //for every span in the scene
        let data = { //construct a blueprint
          string: span.string,
          opacity: span.opacity,
          x: span.x,
          y: span.y
        }
        spanBlueprints.push(data); //push all span bluepritns to one array
      }
      socket.emit('spanSync', spanBlueprints); //send array to server
      console.log('spanSync EMIT');
      console.log(spanBlueprints);
    }
  }); //request world data


  socket.on('clientDisconnect', (disconnectData) => { //remove appropriate textbox from game on a client Disconnect
    console.log("CLIENT DISCONNECTION");
    console.log(disconnectData);
    for (let i = 0; i < textboxes.length; i++) { //cycle through textboxes
      console.log("for:"+i);
      console.log(disconnectData + '===' + textboxes[i].id);
      if (disconnectData === textboxes[i].id) { //find corresponding textbox
        console.log("SPLICE DISCONNECTED CLIENT"+textboxes[i]);
        textboxes[i].element.remove(); //remove html input element
        textboxes.splice(i, 1); //remove from js array
        break;
      }
    }
  });

} //main



function update() {
  for (let box of textboxes) { //update all textboxes
    box.update(); //use data from event handlers, server and camera to restyle html input appropriately
  }

  for (let i = 0; i < spans.length; i++) { //update spans
    spans[i].update();
    if (spans[i].opacity <= 0) { //if opacity is below 0
      spans[i].element.remove(); //remove html span element
      spans.splice(1, i); //remove from js array
    }
  }

  camera.update(); //move camera towards player
}
