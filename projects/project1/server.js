"use strict";
const PORT = process.env.PORT || 3000; //try to find Heroku's port, otherwise began a local server
console.log("process.env.port:"+process.env.PORT);
let express = require('express');
let app = express();
let server = app.listen(PORT);
app.use(express.static('public')); //send all the files in the public folder to any clients
let socket = require('socket.io');
var io = socket(server);
console.log("SOCKET SERVER RUNNING ON PORT:"+PORT);

//initialise global arrays to store all textboxes (players) and html spans in the seen
let textboxBlueprints = []; //ID,value,x,y
let spanBlueprints = []; //value,x,y



//on new connection, call a function with the socket being the unique connection between the server a client
io.on('connection', function(socket) {
  console.log('NEW CLIENT-SERVER CONNECTION');

  if (textboxBlueprints.length > 0) { //if there are textboxes on client connection,
    console.log('REQUESTING WORLD DATA...');
    socket.broadcast.emit('requestWorldData', textboxBlueprints[0].id); //request the position of all textboxes from the oldest client
  } else { //if there are no clients, send data immediately without waiting for sync with oldest client
    console.log('THERE ARE NO CLIENTS PREVIOUSLY JOINED');
    socket.emit('textboxSync', textboxBlueprints);
    socket.emit('spanSync', spanBlueprints);
  }

  socket.on('textboxSync', function(textboxSyncData) { //route data containing all textboxes to clients
      console.log("TEXTBOXSYNC");
      socket.broadcast.emit('textboxSync', textboxSyncData);
  });

  socket.on('spanSync', function(spanSyncData) { //route data containing all spans in scene to clients
    console.log("SPAN SYNC");
    socket.broadcast.emit('spanSync', spanSyncData);
  });
  socket.on('newTextbox', function(newTextboxData) { //on the creation of a new text input
    console.log("NEW TEXTBOX:");
    console.log(newTextboxData);
    textboxBlueprints.push(newTextboxData); //push textinput data (x,y,id,value) to server
    socket.broadcast.emit('newTextbox', newTextboxData); //let all other clients know of this new textinput
  });

  socket.on('newSpan', function(newSpanBlueprintData) { //on newly created span...
    console.log("NEW SPAN:");
    console.log(newSpanBlueprintData);
    spanBlueprints.push(newSpanBlueprintData); //store the data serverside
    socket.broadcast.emit('newSpan', newSpanBlueprintData); //let all other clients know about this new span
  });

  socket.on('textboxValueChange', function(textboxValueChangeData) { //on receiving that a textinput's value has changed
    console.log('textboxValueChangeData');
    console.log(textboxValueChangeData);
    socket.broadcast.emit('textboxValueChange', textboxValueChangeData); //broadcast new value to all other clients
  });

  socket.on('retargeting', function(retargetingData) { //if a textbox changes its target (on mouseclick/drag or on arrowkeys/enter)
    console.log('retarget data');
    console.log(retargetingData);
      socket.broadcast.emit('retargeting', retargetingData); //broadcast new target o all other clients
  });

  socket.on('disconnect', function() { //on client disconnection...
    console.log("CLIENT DISCONNECTION:");
    socket.broadcast.emit('clientDisconnect', socket.id); //let all clients know of disconnection
    for (let i = 0; i < textboxBlueprints.length; i++) {
      if (socket.id === textboxBlueprints[i].id) { //if this socket (which just triggered disconnect event = blueprint)
        textboxBlueprints.splice(i, 1); //remove textbox from serverside
        break;
      }
    }
  });

});
