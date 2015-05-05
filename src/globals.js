var _ = require("underscore");
var makeid = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
}

exports.serverAuthKey = makeid(25);//DO NOT SEND TO CLIENTS. To prove an event is server-side.
exports.players = [];
exports.currentPhase = "night";

exports.findPlayerByName = function(name) {
   return _.find(exports.players, function(p) {return p.name == name;});
};

exports.randomString = makeid;
