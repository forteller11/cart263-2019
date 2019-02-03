"use strict";
//boiler plate server set up code (I do not understand what's going on here, I'm pretty sure the level of abstraction is very high)
let express = require('express');
let app = express();
let server = app.listen(3000);
app.use(express.static('public'));
let socket = require('socket.io');
let io = socket(server);
console.log("SOCKET SERVER RUNNING");

//initialise global arrays to store all textboxes (players) and html spans in the seen
let textboxBlueprints = []; //ID,value,x,y
let spanBlueprints = []; //value,x,y

//on new connection, call a function with the socket being the unique connection between the server a client
io.on('connection', function(socket) {
  console.log('NEW CLIENT-SERVER CONNECTION');

  if (textboxBlueprints.length > 0) {
    console.log('REQUESTING WORLD DATA...');
    socket.broadcast.emit('requestWorldData', textboxBlueprints[0].id); //request the
  } else { //if there are no clients, send data immediately without waiting for sync with client side
    console.log('THERE ARE NO CLIENTS PREVIOUSLY JOINED');
    socket.emit('textboxSync', textboxBlueprints);
    socket.emit('spanSync', spanBlueprints);
  }

  socket.on('textboxSync', function(textboxSyncData) {
      console.log("TEXTBOXSYNC");
      for (let box of textboxSyncData) {
        box.id = textboxSyncData.textboxId;
        box.value = textboxSyncData.textboxValue;
        box.x = textboxSyncData.textboxX;
        box.y = textboxSyncData.textboxY;
      }
      socket.broadcast.emit('textboxSync', textboxBlueprints);
  });

  socket.on('spanSync', function(spanSyncData) {
    console.log("SPAN SYNC");
    for (let span of spanSyncData) {
      span.string = spanSyncData.textboxId;
      span.x = spanSyncData.textboxX;
      span.y = spanSyncData.textboxY;
    }
    socket.broadcast.emit('spanSync', spanBlueprints);
  });

  socket.on('newTextbox', function(newTextboxData) { //store data from new textbox and broadcast to all other clients
    console.log("NEW TEXTBOX:");
    console.log(newTextboxData);
    textboxBlueprints.push(newTextboxData);
    socket.broadcast.emit('newTextbox', newTextboxData);
  });

  socket.on('newSpan', function(newSpanBlueprintData) { //store data from new textbox and broadcast to all other clients
    console.log("NEW SPAN:");
    console.log(newSpanBlueprintData);
    spanBlueprints.push(newSpanBlueprintData);
    socket.broadcast.emit('newSpan', newSpanBlueprintData);
  });

  socket.on('textboxValueChange', function(textboxValueChangeData) { //on value change from client
    console.log('textboxValueChangeData');
    console.log(textboxValueChangeData);
    for (let i = 0; i < textboxBlueprints.length; i++) {
      if (textboxValueChangeData.id === textboxBlueprints[i].id) { //find the corresponding textboxBlueprint
        textboxBlueprints[i].value = textboxValueChangeData.value;
        socket.broadcast.emit('textboxValueChange', textboxValueChangeData); //broadcast data to all clients (except the one that sent the signal)
        break;
      }
    }
  });

  socket.on('retargeting', function(retargetingData) { //receive input from client
    console.log('retarget data');
    console.log(retargetingData);
    for (let i = 0; i < textboxBlueprints.length; i++) {
      if (retargetingData.id === textboxBlueprints[i].id) { //find the corresponding textboxBlueprint
        textboxBlueprints[i].x = retargetingData.x;
        textboxBlueprints[i].y = retargetingData.y;
        socket.broadcast.emit('retargeting', retargetingData); //broadcast data to all clients (except the one that sent the signal)
        break;
      }
    }
  });

  socket.on('disconnect', function() { //on client disconnection...
    console.log("CLIENT DISCONNECTION:");
    for (let i = 0; i < textboxBlueprints.length; i++) {
      if (socket.id === textboxBlueprints[i].id) { //if this socket (which just triggered disconnect event = blueprint)
        textboxBlueprints.splice(i, 1); //remove it
        break;
      }
    }
    socket.broadcast.emit('clientDisconnect', socket.id);
  });

});
