var _ = require("underscore");
var globals = require("./globals.js");
var chat = require("./chatServer.js");
var main = require("../app.js");
var roles = require("../src/roles.js").roles;
var io = main.io;
var roleDistribution = ["Villager", "Villager", "Villager", "Werewolf"];
var phaseMessage =  ["Night falls. Go to sleep.",  "The day begins. Discuss and nominate.",  "Voting begins. Pick from the nominees."]
var phases = ["Night", "Day", "Voting"];
var phasePos = 0; //Checks where in the phase list it is
globals.currentPhase = phases[phasePos];
var nightOrderPos = 0; //checks role for night order
var nightOrder = [roles.Werewolf];
var deathQueue = [];//Queue of people to activate ondeath.

var dayEnd = false;

//Wait until thing starts


function initGame(){
    io.sockets.emit('moderator message', "Night falls, and the game begins...");
    roleDistribution = shuffle(roleDistribution);
    var shuffledPos = 0;
    _.forEach(globals.players, function(p) {
        p.role = roles[roleDistribution[shuffledPos++]]; 
        p.socket.emit('role assigned', p.role.name);
    });
    main.serverSocket.emit("start", JSON.stringify({key:globals.serverAuthKey}));
}

function shuffle(arr){ //v1.0
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

function isWinner() {
    //TODO: Change to faction count. People can be of multiple factions. 
    //TODO:Actually, that might be more complicated to determine winners.
    if(getMembersOfTeam("Wolves") > getMembersOfTeam("Village") || getMembersOfTeam("Wolves") == 0){
        return true;
    }
    return false;
}

exports.startGame = function() {
   //runfirstnight
    main.serverSocket.emit("repeat", JSON.stringify({key:globals.serverAuthKey}));
};

exports.advance = function() {
    if (deathQueue.length > 0) {
            chat.updatePlayers();
    //     globals.currentPhase = death;
    //     var next = deathQueue.pop();
    //     next.apply();
    //     announce deaths
    //     emit advance.
    //     return
    }
    //Check for winners
    phasePos++;
    if (phasePos >= phases.length) {
        phasePos = 0;
    }
    globals.currentPhase = phases[phasePos];
    main.io.sockets.emit('moderator message', phaseMessage[phasePos]);
    main.serverSocket.emit("repeat", JSON.stringify({key:globals.serverAuthKey}));
};

exports.repeatPhase = function() {
    eval("advance"+phases[phasePos]+"();");
};

var announceDeaths = function() {
    var killed = globals.players.filter(function(p) {return p.killed;});
    _.forEach(killed, function(p) {
            main.io.sockets.emit('moderator message', p.name + " is dead.");
            p.killed = false;
            p.dead = true;
            deathQueue.push(p);
    });
    main.serverSocket.emit("advance", JSON.stringify({key:globals.serverAuthKey}));
};
exports.announceDeaths = announceDeaths;

var advanceNight = function() {
    if (nightOrderPos >= nightOrder.length)  {
        nightOrderPos = 0;
        main.serverSocket.emit("announce deaths", JSON.stringify({key:globals.serverAuthKey}));
    } else {
        _.forEach(globals.players, function(p) {p.role.sleep(p);});
        activateRole(nightOrder[nightOrderPos++]);    
    }
};
exports.advanceNight = advanceNight;

var activateRole = function (role) {
    var playersWithRole = globals.players.filter(function(p) {return p.role == role;});
    io.sockets.emit('moderator message', role.name + ", wake up!");
    _.forEach(playersWithRole, function(p) {p.role.wakeUp(p);});
    setTimeout(function() {applyRole(role);}, role.waitTime);
};

var applyRole = function(role) {
   role.completion();
   deactivateRole(role);
   main.serverSocket.emit("repeat", JSON.stringify({key:globals.serverAuthKey}));
};

var advanceDay = function() {
    _.forEach(globals.players, function(p) {p.role.wakeUp(p);});
    setTimeout(function() {main.serverSocket.emit("announce deaths", JSON.stringify({key:globals.serverAuthKey}));}, 20000);
};

var advanceVoting = function() {
    setTimeout(function() {
        countVotes();
        main.serverSocket.emit("announce deaths", JSON.stringify({key:globals.serverAuthKey}));
    }, 
    20000);
};

var countVotes = function () {
    var targets = {};   
    _.forEach(globals.players, function(p) {targets[p.nominated] = 0;});
    _.forEach(globals.players, function(p) {if(targets.hasOwnProperty(p.votedFor)) {targets[p.votedFor]++;}});
    var lynch = _.invert(targets)[_.max(targets)];
    lynch = _.find(globals.players, function(p) {return p.name == lynch;});
    //Check for majority.
    if (lynch !== undefined) {
        lynch.killed = true;
    }
};



var runFirstNight = function () {
    //Add code when first round roles are introduced.
    //advance phase
    main.serverSocket.emit("eval", JSON.stringify({run:"game.advancePhase();", key:globals.serverAuthKey}));
};

var deactivateRole = function(role) {
    var playersWithRole = globals.players.filter(function(e) {return e.role == role;});
    io.sockets.emit('moderator message', role.name + ", go to sleep!");
    _.forEach(playersWithRole, function(p) {p.role.sleep(p);});
};

function getMembersOfTeam(team) {
    return _.groupBy(globals.players, function(p) {return p.role.faction;});
}

exports.roleDistribution = roleDistribution;
exports.initGame = initGame;
