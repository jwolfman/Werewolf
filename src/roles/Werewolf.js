var roleDefaults = require("./defaults.js");
var villager = require("./villager.js"); 
var chat = require("../chatServer.js");
var globals = require("../globals.js");
var _ = require("underscore");

var Werewolf = function () {
    //Laziest possible way to do inheritance
    var template = new villager.Villager();
    for(property in template) {
        this[property] = template[property];
    }
    var self = this;
    this.init = function() {showAllies();};
    this.death = roleDefaults.defaultDeath;
    this.name = "Werewolf";
    this.faction = "Werewolves";
    this.waitTime = 9000;
    this.allies = ["Werewolf"];
    this.werewolfNominatedWho = {};

    this.completion = function() {
        var target = this.whoDidWerewolvesKill();
        target = globals.players.filter(function(p) {return target === p.name;})[0];
        if (target === undefined) {
            return;
        }
        if (!target.defended) {
            target.killed = true;
        }
    };

    this.night = {werewolfKill : function(user, target) {
            self.werewolfNominatedWho[user.name] = target.name;
            chat.emitToAwake("werewolf nominations", self.werewolfNominatedWho);
        }
    };

    this.whoDidWerewolvesKill = function() {
        var targets = {};
        for (kill in self.werewolfNominatedWho) {
            if (targets.hasOwnProperty(self.werewolfNominatedWho[kill])) {
                targets[self.werewolfNominatedWho[kill]]++;
            }
            else {
                targets[self.werewolfNominatedWho[kill]] = 0;
            }
        }
        self.werewolfNominatedWho = {};
        return _.invert(targets)[_.max(targets)];
    };
};

exports.werewolf = new Werewolf();
exports.Werewolf = Werewolf;
