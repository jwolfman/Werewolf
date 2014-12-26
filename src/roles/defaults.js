exports.nop = function() { };
exports.defaultDeath = function(target) {
    target.silenced = true;
    target.dead = true;
    target.faction = "dead";
};
exports.defaultSleep = function (p) {p.asleep = true;};
exports.defaultDay ={nominate:function() {}};
