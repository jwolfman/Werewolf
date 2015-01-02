var roleDefaults = require("./defaults.js");

var Villager = function() {
    this.init = roleDefaults.nop;
    this.Day = roleDefaults.defaultDay;
    this.firstNight = {};
    this.night = {}; 
    this.Voting= roleDefaults.defaultVoting;
    this.death = roleDefaults.defaultDeath;
    this.completion = roleDefaults.nop();
    this.name = "Villager";
    this.faction = "Village";
    this.allies = [];
    this.wakeUp = roleDefaults.defaultWake;
    this.sleep = roleDefaults.defaultSleep;
    this.explanation="The Villager's sole purpose is to find the Werewolves in the village and lynch them during the day.";
    this.night = [];
    this.day = [];
    this.deathApply = null;
    this.deathActions = [];
};

exports.villager = new Villager();
exports.Villager = Villager;
