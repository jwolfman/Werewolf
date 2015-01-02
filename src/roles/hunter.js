var roleDefaults = require("./defaults.js");
var villager = require("./villager.js");
var chat = require("../chatServer.js");
var globals = require("../globals.js");
var _ = require("underscore");

var Hunter = function() {
    var template = new villager.Villager();
    for(property in template) {
        this[property] = template[property];
    }
    this.targeted = {};
    this.waitTime = 7000;
    this.lastTarget = [];
    var self = this;
    this.name = "Hunter";
    this.faction = "Village";
    this.explanation="When you die, you may kill another player.";
    this.targeted = {};
    this.Death = {hunterkill:function(user, target) {
            self.targeted[user.name] = target.name;
            chat.emitToAwake("targeted", self.targeted);
    }};
    this.deathApply = function(user) {
        var target = globals.findPlayerByName(self.targeted[user.name]);
        if(target !== undefined) {
            target.killed = true;
        }
        user.silenced = true;
        user.dead = true;
        user.faction = "dead";
    };
    this.deathActions = [{action:"hunterkill", title:"Kill"}];
};

exports.hunter = new Hunter();
exports.Hunter = Hunter;
