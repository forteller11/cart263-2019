"use strict";
window.onload = main;
let textboxes = [];
let spans = [];
let camera;

let sessionID; //unique identifier of specefic client/server connections
let socket;

const updateTime = 16.7; //~60fps
let mouseX = 0; //track mouseX/Y globally
let mouseY = 0;
const charSize = 16; //fontSize
const lineSpace = 32; //when users press enter how far the textbox travels vertically
const letterKerningSpace = 2; //space inbetween letters
let body = document.getElementsByTagName("body");




function main() {
  socket = io.connect('http://localhost:3000');

  socket.on('connect', () => { //on connection w/server...
    console.log('connected to server');

    socket.on('textboxSync', (textboxSyncData) => { //wait for data in which to appropriately instatiate textbox objects
      console.log('receiving textbox sync data from server');
      if (!(textboxSyncData.length === 0)) { //if there is data....
        for (let box of textboxDataSync) { //instatiate textboxes based on data from server
          textboxes.push(new Textbox(box.id, box.value, box.x, box.y));
        }
      } else {
        console.log('there are no textboxes');
      }
      //if no textboxes, init
      //if no spans init
      socket.on('spanSync', (spanSyncData) => { //wait for data in which to appropriately instantiate spans
        console.log('intialisiing Spans');
        if (!(spanSyncData.length === 0)) { //if there is data....
          for (let span of spanSyncData) { //instatiate spans based on data from server
            spans.push(new Span(span.string, span.x, span.y, span.opacity));
          }
        } else {
          console.log('there are no spans');
        }
        console.log('create new avatar');
        sessionID = socket.id; //unique identifier of this client-server connection (socket)
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

        socket.on('newTextbox', (newTextboxData) => {
          console.log('newtextbox connected');
          textboxes.push(new Textbox(newTextboxData.id, newTextboxData.value, newTextboxData.x, newTextboxData.y));
        });

        socket.on('newSpan', (newSpanBlueprintData) => {
          console.log('newSpan BlueprintData');
          console.log(newSpanBlueprintData);
          spans.push(new Span(newSpanBlueprintData.string, newSpanBlueprintData.x, newSpanBlueprintData.y));
        });


        socket.on('textboxValueChange', (textboxValueChangeData) => { //receive input from other cleints
          for (let i = 0; i < textboxes.length; i++) {
            if (textboxValueChangeData.id === textboxes[i].id) { //find the corresponding textbox
              textboxes[i].element.value = textboxValueChangeData.value;
              textboxes[i].ajustWidth();
              break;
            }
          }
        });

        socket.on('retargeting', (retargetingData) => { //receive retargets from other clients
          for (let i = 0; i < textboxes.length; i++) {
            if (retargetingData.id === textboxes[i].id) { //find the corresponding textbox
              textboxes[i].x = retargetingData.x;
              textboxes[i].y = retargetingData.y;
              textboxes[i].targetX = retargetingData.targetX;
              textboxes[i].targetY = retargetingData.targetY;
              break;
            }
          }
        });
        socket.on('requestWorldData', (idData) => {
          console.log('WORLD DATA REQUESTED');
          if (idData === sessionID) { //if first client and server requests world data, send it
            //construct blobs
            let boxBlueprints = [];
            console.log('textboxes:');
            console.log(textboxes);
            for (let box of textboxes) {
              let data = {
                id: box.y,
                value: box.element.value,
                x: box.x,
                y: box.y
              }
              boxBlueprints.push(data);
            }
            socket.emit('textboxSync', boxBlueprints);
            console.log('textboxSync EMIT');
            console.log(boxBlueprints);

            let spanBlueprints = [];
            for (let span of spans) {
              let data = {
                string: span.string,
                opacity: span.opacity,
                x: span.x,
                y: span.y
              }
              spanBlueprints.push(data);
            }
            socket.emit('spanSync', spanBlueprints);
            console.log('spanSync EMIT');
            console.log(spanBlueprints);
          }
        });
      }); //span sync
    }); //textbox sync
    socket.on('clientDisconnect', (disconnectData) => { //remove appropriate textbox from game on clientDisconnect
      console.log("CLIENT DISCONNECTION");
      for (let i = 0; i < textboxes.length; i++) {
        if (disconnectData === textboxes[i].id) {
          textboxes[i].element.remove();
          textboxes.splice(i, 1);
          break;
        }
      }
    });
  }); //connection

  //create textinput and child it to the body
  document.addEventListener("mousemove", trackMouseMovement);
}


function update() {
  for (let box of textboxes) { //update all textboxes
    box.update();
  }

  for (let i = 0; i < spans.length; i++) { //update spans
    spans[i].update();
    if (spans[i].opacity <= 0) {
      spans[i].delete();
      spans.splice(1, i);
    }
  }
  camera.update();
}
