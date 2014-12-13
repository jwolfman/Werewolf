var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var roleModule = require('./src/static/roles.js');
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/moderator",function(req,res){
    res.render("moderator.ejs", {roles:roleModule.gameRoles });
});

var server=http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
