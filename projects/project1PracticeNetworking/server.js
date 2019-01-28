let express = require('express');
let app = express();
let server = app.listen(3000);

app.use(express.static('public'));
console.log("socket server running");

let socket = require('socket.io');
let io = socket(server);

//on new connection, call anynomous function
io.sockets.on('connection',function(socket){
  console.log('new connection:' + socket.id);

});
