var roleDefaults = require("./defaults.js");

var Villager = function() {
    this.init = roleDefaults.nop;
    this.day = roleDefaults.defaultDay;
    this.firstNight = {};
    this.night = {}; 
    this.death = roleDefaults.defaultDeath;
    this.completion = roleDefaults.nop();
    this.name = "Villager";
    this.faction = "Village";
    this.allies = [];
    this.sleep = roleDefaults.defaultSleep;
};

exports.villager = new Villager();
exports.Villager = Villager;
