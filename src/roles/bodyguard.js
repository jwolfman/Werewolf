var roleDefaults = require("./defaults.js");
var villager = require("./villager.js");
var chat = require("../chatServer.js");
var globals = require("../globals.js");
var _ = require("underscore");

var Bodyguard = function() {
    var template = new villager.Villager();
    for(property in template) {
        this[property] = template[property];
    }
    this.targeted = {};
    this.waitTime = 7000;
    this.lastTarget = [];
    var self = this;
    this.name = "Bodyguard";
    this.faction = "Village";
    this.Night = {bodyguardProtect:function(user, target) {
            if (self.lastTarget.indexOf(user) !== -1) {
                chat.emitToAwake("moderator message", "Person was saved last round");
                return;
            }
            self.targeted[user.name] = target.name;
            chat.emitToAwake("targeted", self.targeted);
    }}; 
    this.completion = function() {
           var targets = _.map(self.targeted, function(name, user) {return globals.findPlayerByName(name);});
           self.lastTarget = [];
           _.each(targets, function(p) {
                p.defended = true; 
                self.lastTarget.push(p.name);}
            );
    };
    this.explanation="Once per night, you may make one player immune to werewolf attacks. You may not protect the same player two nights in a row.";
    this.night = [{action:"bodyguardProtect", title:"Protect"}];
};

exports.bodyguard = new Bodyguard();
exports.Bodyguard = Bodyguard;
