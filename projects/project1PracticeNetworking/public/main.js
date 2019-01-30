"use strict";
let socket;
let players = []; //arry of all players in session
let sessionID;
window.onload = main;

function setup() {
  createCanvas(200, 200);
}

function draw(){
    background(51);
    for (let player of players){
      player.draw();
    }
}

function main (){
  console.log("main");
  socket = io.connect('http://localhost:3000');

  socket.on('connect', function() { //on connection with server...
    sessionID = socket.id; //save session id
    console.log("sessionID:"+sessionID);
    //fill up array with all current players,  also fill up screen with all current text
    // socket.players = players;
    let newPlayer = new Player(random(200),random(200),sessionID);
    players.push(newPlayer);
    // socket.emit('pushPlayer',data);

  //   //if receive data that other player has moved
  //   socket.on('playerMoved',function(data){ //find player ID which matches data, then set players pos to that data's pos
  //     for (let i = 0; i < players.length; i ++){
  //       if (data.id === players[i].id){
  //         players[i].x = data.x;
  //         players[i].y = data.y;
  //       }
  //     }
  //   });
  // });
  //
  // socket.on('playerMoved', function(data){
  //   for (let i = 0; i < players.length; i ++){ //move current player (for immediate response)
  //     if (data.id === players[i].id){
  //       players[i].x = data.x;
  //       players[i].y = data.y;
  //       break; //break out of loop
  //     }
  //     console.log("received player movements");
  //   }
  // });
  document.addEventListener("mousemove",function (e){
    console.log("mouseDownFunction");
    for (let i = 0; i < players.length; i ++){ //move current player (for immediate response)
      if (sessionID === players[i].id){
        players[i].x = e.clientX;
        players[i].y = e.clientY;
        let data = {
          x: e.clientX,
          y: e.clientY,
          id: players[i].id
        }
        socket.emit('playerMoved',data);
        break; //break out of loop
      }
    }

  });
});
}
