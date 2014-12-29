var roleDefaults = require("./defaults.js");
var villager = require("./villager.js"); 
var chat = require("../chatServer.js");
var globals = require("../globals.js");
var _ = require("underscore");

var Seer = function () {
    //Laziest possible way to do inheritance
    var template = new villager.Villager();
    for(property in template) {
        this[property] = template[property];
    }
    var self = this;
    this.name = "Seer";
    this.waitTime = 7000;

    this.targeted = {};
    this.Night = {see: function(user, target) {
            self.targeted[user.name] = target.name;
            chat.emitToAwake("targeted", self.targeted);
        }
    };
    this.completion = function() {
           var targets = _.map(self.targeted, function(name, user) {return globals.findPlayerByName(name);});
           _.each(targets, function(p) {chat.emitToAwake("moderator message", "This person is a member of faction " + p.role.faction);});
    };
};

exports.seer = new Seer();
exports.Werewolf = Seer;
