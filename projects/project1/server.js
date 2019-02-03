
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
io.on('connection',function(socket){
  console.log('NEW CLIENT-SERVER CONNECTION');
  if (textboxBlueprints.length > 0){
    socket.emit('requestWorldDaata',textboxBlueprints[0].id); //request the
    socket.on('textboxDataSync',function(textboxDataSync){
      for(let box of textboxDataSync){
        box.id = textboxDataSync.textboxId;
        box.value = textboxDataSync.textboxValue;
        box.x = textboxDataSync.textboxX;
        box.y = textboxDataSync.textboxY;
      }
      socket.emit('textboxDataSync',textboxBlueprints);
      socket.on('spanDataSync',function(spanDataSync){
        for(let span of spanBlueprints){
          span.string = spanDataSync.textboxId;
          span.x = spanDataSync.textboxX;
          span.y = spanDataSync.textboxY;
        }
        socket.emit('spanDataSync',spanBlueprints);
      });
    });
  } else { //if there are no clients, send data immediately without waiting for sync with client side
    socket.emit('textboxDataSync',textboxBlueprints);
    socket.emit('spanDataSync',spanBlueprints);
  }
  socket.emit('requestWorldData',textboxBlueprints[0].id); //request the
  socket.emit('initialiseTextboxes', textboxBlueprints); //make sure all players know of the existence of the new player
  console.log('initialise textboxes');
  socket.emit('initialiseSpans', spanBlueprints); //make sure all players know of the existence of the new player
  console.log('initialise spans');

  socket.on('newTextbox', function(newTextboxData){ //store data from new textbox and broadcast to all other clients
    console.log("NEW TEXTBOX:");
    console.log(newTextboxData);
    textboxBlueprints.push(newTextboxData);
    socket.broadcast.emit('newTextbox',newTextboxData);
  });

  socket.on('newSpan', function(newSpanBlueprintData){ //store data from new textbox and broadcast to all other clients
    console.log("NEW SPAN:");
    console.log(newSpanBlueprintData);
    spanBlueprints.push(newSpanBlueprintData);
    socket.broadcast.emit('newSpan',newSpanBlueprintData);
  });

  socket.on('textboxValueChange',function(textboxValueChangeData) { //on value change from client
    console.log('textboxValueChangeData');
    console.log(textboxValueChangeData);
    for (let i = 0; i < textboxBlueprints.length; i ++){
      if (textboxValueChangeData.id === textboxBlueprints[i].id){ //find the corresponding textboxBlueprint
        textboxBlueprints[i].value = textboxValueChangeData.value;
        socket.broadcast.emit('textboxValueChange',textboxValueChangeData); //broadcast data to all clients (except the one that sent the signal)
        break;
      }
    }
  });

  socket.on('retargeting',function(retargetingData) { //receive input from client
    console.log('retarget data');
    console.log(retargetingData);
    for (let i = 0; i < textboxBlueprints.length; i ++){
      if (retargetingData.id === textboxBlueprints[i].id){ //find the corresponding textboxBlueprint
        textboxBlueprints[i].x = retargetingData.x;
        textboxBlueprints[i].y = retargetingData.y;
        socket.broadcast.emit('retargeting',retargetingData); //broadcast data to all clients (except the one that sent the signal)
        break;
      }
    }
  });

  socket.on('disconnect',function(){ //on client disconnection...
    console.log("CLIENT DISCONNECTION:");
    for (let i = 0; i < textboxBlueprints.length; i ++){
      if (socket.id === textboxBlueprints[i].id){ //if this socket (which just triggered disconnect event = blueprint)
        textboxBlueprints.splice(i,1); //remove it
        break;
      }
    }
    socket.broadcast.emit('clientDisconnect',socket.id);
  });

});
