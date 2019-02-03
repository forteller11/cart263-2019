"use strict";
window.onload = main;
let textboxes = [];
let player;
let sessionID; //unique identifier of specefic client/server connections

let camera;
let spans = [];
const updateTime = 16.7; //~60fps
let mouseX = 0; //track mouseX/Y globally
let mouseY = 0;
const charSize = 16; //fontSize
const lineSpace = 32; //when users press enter how far the textbox travels vertically
const letterKerningSpace = 2; //space inbetween letters
let body = document.getElementsByTagName("body");

let socket;


function main() {
  socket = io.connect('http://localhost:3000');
  socket.on('connect', () => { //on connection w/server...
    console.log('connected to server');

    socket.on('initialiseTextboxes', (initialiseTextboxesData) => { //wait for data in which to appropriately instatiate textbox objects
      console.log('initalising textboxes');
      if (!(initialiseTextboxesData.length === 0)) { //if there is data....
        for (let box of initialiseTextboxesData) { //instatiate textboxes based on data from server
          textboxes.push(new Textbox(box.id, box.value, box.x, box.y));
        }
      } else {
        console.log('there are no players');
      }

      socket.on('initialiseSpans', (initialiseSpansData) => { //wait for data in which to appropriately instantiate spans
        console.log('intialisiing Spans');
        if (!(initialiseSpansData.length === 0)) { //if there is data....
          for (let span of initialiseSpansData) { //instatiate spans based on data from server
            spans.push(new Span(span.value, span.x, span.y));
          }
        } else {
          console.log('there are no spans');
        }
        console.log('create new avatar');
        sessionID = socket.id; //unique identifier of this client-server connection (socket)
        let newAvatar = new Avatar(sessionID);
        let newAvatarData = { //create literal object to send to server
          id: newAvatar.id,
          value: newAvatar.value,
          x: newAvatar.x,
          y: newAvatar.y
        }
        socket.emit('newTextbox', newAvatarData);
        textboxes.push(newAvatar);
        camera = new Camera(newAvatar); //set camera to follow the most recently pushed player (the avatar)
        update(); //update immediately
        setInterval(update, updateTime); //set update to ~ 60 times a second

        socket.on('newTextbox', (newTextboxData) => {
          textboxes.push(new Textbox(newTextboxData.id, newTextboxData.value, newTextboxData.x, newTextboxData.y));
        });

      });
    });
  });
  //create textinput and child it to the body
  document.addEventListener("mousemove", trackMouseMovement);
}


function update() {
  for (let player of textboxes) {
    player.update();
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
