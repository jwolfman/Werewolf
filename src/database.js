var mysql = require('mysql');
var config = require('../config.js');
var templater = require("string-template");
var globals = require("./globals.js");

var connection  = mysql.createConnection({ 
    host : config.database[config.mode].host,
    user : config.database[config.mode].user,
    password : config.database[config.mode].password,
    database : config.database[config.mode].database
});
connection.connect();

exports.getUser = function(username, callback) {
    var query = templater( 'SELECT * FROM users WHERE username="{username}";', {username:username});
    return connection.query(query, function(err, rows, fields) { 
        if (err) {throw err;}
         callback(rows); 
    });
};

exports.addUser = function(username, password, email) {
    arguments[salt] = globals.randomString(29);
    password = crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha256');
    var query = templater('INSERT INTO users VALUES ("{username}", "{password}", "{salt}", "{email}");', arguments);
    connection.query(query, function(err, rows, fields) { 
        if (err) {throw err;}
        console.log(rows);
    });
};

exports.connection = connection;
