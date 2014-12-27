var main = require("../../app.js");
var globals = require("../globals.js");
var chat = require("../chatServer.js");
var _ = require("underscore");
exports.nop = function() { };
exports.defaultDeath = function(target) {
    target.silenced = true;
    target.dead = true;
    target.faction = "dead";
};

exports.defaultSleep = function (p) {p.nominated = ""; p.votedFor = "";  p.awake = false; p.silenced = false;};
exports.defaultWake = function (p) {p.awake = true; p.silenced = false;};

exports.defaultDay ={
    nominate:function(user, target) {
        user.nominated = target.name;
        main.io.sockets.emit("moderator message", user.name + " has nominated " + target.name + "!");
        chat.updatePlayers();
    }
};

exports.defaultVoting = {
    vote:function(user, target) {
        var nominated = _.find(globals.players, function(p) {return target.name == p.nominated;});
        if (nominated !== undefined) {
            user.votedFor = target.name;
        }
        else {
            user.socket.emit("moderator message", target.name + "is not nominated.");
        }
}};
