let express = require('express');
let app = express();
let server = app.listen(3000);
let players = [];
// let players = [let player={
//   x: 100,
//   y: 100,
//   id: "23fdsfds90fds"
// }];

app.use(express.static('public'));
console.log("socket server running");

let socket = require('socket.io');
let io = socket(server);


//on new connection, call anynomous function with socket as event
io.sockets.on('connection',function(socket){
  console.log("server side playerobj array")
    console.log(players);
  socket.emit('initPlayers',players); //immediately after connection tell client the state of all player objs


  console.log('new connection:' + socket.id);

  socket.on('playerMoved',function(data){ //when a msg is received by client called mouseMove
    console.log(data);
    // for (let i = 0; i < players.length; i ++){ //move current player (for immediate response)
    //   if (data.id === players[i].id){
    //     players[i].x = data.x;
    //     players[i].y = data.y;
    //     let data = {
    //       x: data.x,
    //       y: data.y,
    //       id: data.id
    //     }
    //     socket.emit('playerMoved',data);
    //     break; //break out of loop
    //   }
    // }
  });

  socket.on('newPlayer', function(newPlayer) {
    console.log("NEW PLAYER");
    players.push(newPlayer); //data = new player instance
    console.log(players);
  });

});
