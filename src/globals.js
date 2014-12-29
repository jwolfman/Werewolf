var _ = require("underscore");
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 25; i++ ) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
}

exports.serverAuthKey = makeid();//DO NOT SEND TO CLIENTS. To prove an event is server-side.
exports.players = [];
exports.currentPhase = "night";

exports.findPlayerByName = function(name) {
   return _.find(exports.players, function(p) {return p.name == name;});
};
