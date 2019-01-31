
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
let players = [];
let strings = [];

//on new connection, call a function with the socket being the unique connection between the server a client
io.on('connection',function(socket){
  socket.emit('initialiseAllPlayers', players); //make sure all players know of the existence of the new player
});
