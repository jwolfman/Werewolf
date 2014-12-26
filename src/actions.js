var game = require("./game.js");
var roles = require("./roles.js").gameRoles;
var players = require("./chatServer.js").people;
var main = require("../app.js");

var werewolfKillNominations = {};
var werewolfNominatedWho = {};
