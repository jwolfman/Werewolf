var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var roleModule = require('./src/roles.js');
var server=http.createServer(app);
var io = require('socket.io')(server);
exports.io = io;
var bodyParser = require('body-parser');
var game = require('./src/game.js');
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + '/public'));

strBodyParser = bodyParser.urlencoded({extended:false});

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/moderator",function(req,res){
    res.render("moderator.ejs", {roles:roleModule.gameRoles });
});

app.post('/moderator', strBodyParser, function(req, res) {
    game.roleDistribution = req.body;
    res.sendStatus(200);
});

var chatServer = require("./src/chatServer.js");

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
