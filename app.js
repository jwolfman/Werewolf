var crypto = require('crypto');
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server=http.createServer(app);
var bodyParser = require('body-parser');
var database = require('./src/database.js');
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/moderator",function(req,res){
    res.render("moderator.ejs", {roles:roleModule.gameRoles });
});

app.post("/moderator", function(req, res) {
    game.roleDistribution = [];
    roles = Object.keys(req.body);
    for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        for (var j = 0; j < req.body[role]; j++) {
            game.roleDistribution.push(role);
        }
    }
    res.sendStatus(200);
});

app.get("/signup", function(req,res){
    res.render("signup.ejs", {error:"hello"});
});

app.post("/user", function(req, res) {
    database.getUser(req.body.username);
    res.send("");
});
app.post("/signup", function(req, res) {
    console.log(req.body);
    database.getUser(req.body.username);
    //Check if allowed
    // query = database.connection.query(querystring)
});

app.get("/login",function(req,res){
    res.render("login.ejs");
});

var io = require('socket.io')(server);
exports.io = io;
var socketClient = require("socket.io-client");
exports.serverSocket = socketClient.connect('http://localhost:3000');
var chatServer = require("./src/chatServer.js");
var game = require('./src/game.js');
var roleModule = require('./src/roles.js');

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
