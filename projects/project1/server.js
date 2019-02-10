"use strict";
const PORT = process.env.PORT || 3000; //try to find Heroku's port, otherwise (if undefined) make port a local one
console.log("process.env.port:"+process.env.PORT);
let express = require('express');
let app = express();
let server = app.listen(PORT);
app.use(express.static('public')); //send all the files in the public folder to joined clients
let socket = require('socket.io');
var io = socket(server);
console.log("SOCKET SERVER RUNNING ON PORT:"+PORT);

//initialise global arrays to store all textboxes (players) and html spans in the seen
let textboxBlueprints = []; //ID,value,x,y; but just used to store
let spanBlueprints = []; //value,x,y



//on new connection, call a function with the socket being the object repersenting the unique connection between the server-client
//then set various socket.on's and emits to listener for recieve and trasnmit data between server-clientside
io.on('connection', function(socket) {
  console.log('NEW CLIENT-SERVER CONNECTION');


/*
if a new client joins the server, the server asks the oldest client to send it all
its world data as a sort of ground truth (in this case it's ok that a client acts as
a ground truth because security is not an issue and I wanted to take off as much load
from the server side as possible, the server then updates its own internal arrays
representing a blueprint for the spans and textboxes and sends it to the newly connected
client so it can sync up with the sort of ground truth. This requesting of world data is necessary
because the server isn't constantly updating its arrays everytime data is sent inbetween clients
because this itteration would cause a tiny but uncessary performance decrease and
the free heroku servers are NOT very powerful and I wanted the app to be as scalable
as possible given these performance restraints.
*/
  if (textboxBlueprints.length > 0) { //if there are textboxes on client connection,
    console.log('REQUESTING WORLD DATA...');
    socket.broadcast.emit('requestWorldData', textboxBlueprints[0].id); //request the position of all textboxes from the oldest client
  } else { //if there are no clients, send data immediately without waiting for sync with oldest client to act as ground truth
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
    console.log(socket.id);
    socket.broadcast.emit('clientDisconnect', socket.id); //let all clients know of disconnection
    for (let i = 0; i < textboxBlueprints.length; i++) {
      if (socket.id === textboxBlueprints[i].id) { //if this socket (which just triggered disconnect event = blueprint)
        textboxBlueprints.splice(i, 1); //remove textbox from serverside
        break;
      }
    }
  });

});
