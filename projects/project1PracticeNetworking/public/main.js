"use strict";
let socket;
let players = []; //arry of all players in session
let sessionID;
window.onload = main;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(51);
  for (let player of players) {
    player.draw();
  }
}

function main() {
  console.log("main");
  socket = io.connect('http://localhost:3000');

  socket.on('connect', function() { //on connection with server...
    socket.on('initPlayers', function(initPlayersData) { //before doing anything, wait for server to tell client where all existing players are
      console.log('initPlayersData');
      console.log(initPlayersData.length);
      if (!(initPlayersData.length === 0)) {
        for (let i = 0; i < initPlayersData.length; i++) { //using initPlayesData create fully fledged player data with methods and all
          players.push(new Player(initPlayersData[i].x, initPlayersData[i].y, initPlayersData[i].id));
          console.log("pushPlayer!");
        }
        console.log("players post initialization");
        console.log(players);
      } else {
        console.log("there are no players ");
      }
      sessionID = socket.id; //save session id
      console.log("sessionID:" + sessionID);
      //fill up array with all current players,  also fill up screen with all current text
      let newPlayer = new Player(random(200), random(200), sessionID);
      players.push(newPlayer);
      socket.emit('newPlayer', newPlayer);

      socket.on('disconnect', function() { //tell server on disconnect
        console.log('RECIEVED DISCONNECT');
            socket.emit('disconnect', sessionID);
        });

        socket.on('playerDisonnect', function(dataID) { //splice player when server tells you it disconnected
          for (let i = 0; i < players.length; i ++){
            if (dataID === players[i].id){ //find corresponding id, and change the position, then emit data
              players.splice(i,1);
              break; //break out of loop
            }
          }
          });

      document.addEventListener('mousemove', function(e) {
        console.log("mouseDownFunction");
        for (let i = 0; i < players.length; i++) { //move current player (for immediate response)
          if (sessionID === players[i].id) {
            players[i].x = e.clientX;
            players[i].y = e.clientY;
            let data = {
              x: players[i].x,
              y: players[i].y,
              id: players[i].id
            }
            socket.emit('playerMoved', data);
            break; //break out of loop
          }
        }

      });


      //if receive data that other player has moved
      socket.on('playerMoved', function(data) {
        console.log("dataID");
        console.log(data.id);
        console.log("sessionID");
        console.log(sessionID);
        if (!(data.id === sessionID)) { //if not reffering to self
          console.log("received player movements");
          for (let i = 0; i < players.length; i++) { //move current player (for immediate response)
            if (data.id === players[i].id) {
              console.log("found appropriate player");
              players[i].x = data.x;
              players[i].y = data.y;
              break; //break out of loop
            }

          }
        }
      });

      //if receive data that other player has moved
      socket.on('newPlayer', function(data) {
        if (!(data.id === sessionID)) { //if not reffering to self
          console.log("NEW PLAYER JOINED FROM OTHER SESSION");
          players.push(new Player(data.x, data.y, data.id));
        }
      });
    });
  });
}
