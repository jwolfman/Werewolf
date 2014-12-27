var globals = require("./globals.js");
var _ = require("underscore");
var user = require("./user.js");
var main = require("../app.js");
var io = main.io;
var gameRunning = false;
var game = require("./game.js");

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    if (gameRunning) {
        for (var i = 0; i < globals.players.length; i++) {
            if(socket == globals.players[i].socket) {
                globals.players.splice(i, 1);
                break;
            }
        }
    } else {
        for (var i = 0; i < globals.players.length; i++) {
            if(socket == globals.players[i].socket) {
                globals.players[i].status = "Dead";
            }
        }
    }
  });

  socket.on('user connect', function(nameParam) {
    globals.players.push(new user.User(nameParam, socket));
    io.sockets.emit('update users', JSON.stringify(sanitizedPlayersList()));
    if(globals.players.length == game.roleDistribution.length) {
        gameRunning=true;
        game.initGame(); 
    }
  });

  socket.on('user chat message', function(message) {
    var user = _.find(globals.players, function(p) {return p.socket  == socket;});
    if(user.awake && !user.silenced && !user.dead) {
        emitToAwake("chat message", JSON.parse(message));
    }
    else {
        socket.emit('moderator message', "You cannot do that at this time.");
    }
  });

  socket.on('action', function(actionString) {
     var actionPost = JSON.parse(actionString);
     var user = _.find(globals.players, function(p) {return p.name == actionPost.user;});
     var target = _.find(globals.players, function(p) {return p.name == actionPost.target;});
     //This expr is evaluated before the if for the purpose of 
     try {
        var allowed = !user.dead && user.awake && user.role[globals.currentPhase].hasOwnProperty(actionPost.action);
    } catch (err) {
        console.log(err);
        allowed = false; 
    }
    if (allowed) {
        user.role[globals.currentPhase][actionPost.action](user, target);
    }
    else {
        socket.emit('moderator message', "You cannot do that at this time.");
    }
    });

    socket.on("start", function(obj) {
        var evalObj = JSON.parse(obj);
        if (evalObj.key == globals.serverAuthKey) {
            game.startGame();
        }
        else {
            console.log("Incorrect server key used.");
        }
    });

    socket.on("advance", function(obj) {
        var evalObj = JSON.parse(obj);
        if (evalObj.key == globals.serverAuthKey) {
            game.advance();
        }
        else {
            console.log("Incorrect server key used.");
        }
    });

    socket.on("announce deaths", function(obj) {
        var evalObj = JSON.parse(obj);
        if (evalObj.key == globals.serverAuthKey) {
            game.announceDeaths();
        }
        else {
            console.log("Incorrect server key used.");
        }
    });

    socket.on("repeat", function(obj) {
        var evalObj = JSON.parse(obj);
        if (evalObj.key == globals.serverAuthKey) {
            game.repeatPhase();
        }
        else {
            console.log("Incorrect server key used.");
        }
    });

  socket.on("getPlayers",function(){
        io.sockets.emit("setPlayers",JSON.stringify(sanitizedPlayersList()));
    });

});

var emitToAwake = function(event, obj) {
   obj = JSON.stringify(obj); 
   var awake = globals.players.filter(function(p) {return p.awake;});
   _.forEach(awake, function (p) {p.socket.emit(event, obj);});
};
exports.emitToAwake = emitToAwake;

var sanitizedPlayersList = function() {
    var sanitized = [];
    for (var i = 0; i < globals.players.length; i++) {
        var obj = _.clone(globals.players[i]);
        obj.socket = null;
        obj.role = null;
        sanitized.push(obj);
    }
    return sanitized;
};

function updatePlayers() {
        io.sockets.emit('update users', JSON.stringify(sanitizedPlayersList()));
}
exports.updatePlayers = updatePlayers;
