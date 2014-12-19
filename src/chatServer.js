var main = require("../app.js");
var user = require("./user.js");
var game = require("./game.js");
var io = main.io;
var people = [];
var peopleSockets = {};

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    if (game.gameRunning) {
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
    people.push(new user.User(nameParam));
    peopleSockets[nameParam] = socket;
    io.sockets.emit('update users', JSON.stringify(people));
    if(people.length == game.roleDistribution.length) {
        game.initGame(); 
    }
  });

  socket.on('user chat message', function(message) {
      //TODO:Block if slienced
    io.sockets.emit('chat message', message);
  });

});

exports.people = people;
exports.peopleSockets = peopleSockets;
