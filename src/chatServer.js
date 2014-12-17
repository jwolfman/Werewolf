var main = require("../app.js");
var io = main.io;
var people = [];
var sockets = [];

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    //TODO: Add logic for user levaing mid-game(kill)  
    // or pre-game(remove from players)
  });

  socket.on('user connect', function(nameParam) {
    people.push({name:nameParam, stat:"alive"});
    io.sockets.emit('update users', JSON.stringify(people));
  });

  socket.on('user chat message', function(message) {
      //TODO:Block if not a talky-time
    io.sockets.emit('chat message', message);
  });

});

exports.people = people;
