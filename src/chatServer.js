var main = require("../app.js");
var user = require("user.js");
var io = main.io;
var people = [];
var sockets = [];

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    //TODO: Add logic for user levaing mid-game(kill)  
    // or pre-game(remove from players)
    if (gameRunning) {
        for (var i = 0; i < people.length; i++) {
            if(socket == people[i].socket) {
                people.splice(i, 1);
                break;
            }
        }
    } else {
        for (var i = 0; i < people.length; i++) {
            if(socket == people[i].socket) {
                people[i].status = "Dead";
            }
        }
    }
  });

  socket.on('user connect', function(nameParam) {
    io.sockets.emit('update users', JSON.stringify(people));
  });

  socket.on('user chat message', function(message) {
      //TODO:Block if not a talky-time
    io.sockets.emit('chat message', message);
  });

});

exports.people = people;
