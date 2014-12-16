var main = require("./app.js");
var io = main.io;
var people = [];

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  
  });
  socket.on('user connect', function(nameParam) {
    people.push({name:nameParam, stat:"alive"});
    io.sockets.emit('update users', JSON.stringify(people));
  });
});

exports.people = people;
