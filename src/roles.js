//IMPORTANT: name and object identfier MUST MATCH! ROLE WILL BE undefined OTHERWISE!
//Completion is meant for enabling actions
var villager = require("./roles/villager.js");
var werewolf = require("./roles/werewolf.js");
var seer = require("./roles/seer.js");
var bodyguard = require("./roles/bodyguard.js");
var hunter = require("./roles/hunter.js");

var gameRoles = {
    Villager: villager.villager,
    Seer: seer.seer,
    Werewolf: werewolf.werewolf,
    Bodyguard: bodyguard.bodyguard,
    Hunter: hunter.hunter
};

exports.roles = gameRoles;
