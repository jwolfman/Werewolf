var globals = require("./globals.js");
var main = require("../app.js");
var roles = require("../src/roles.js").roles;
var io = main.io;
var roleDistribution = ["Villager", "Villager", "Werewolf"];
var phases = ["Night"/*, "Day", "Voting"*/];
var phasePos = 0; //Checks where in the phase list it is
var nightOrderPos = 0; //checks role for night order
var nightOrder = [roles.Werewolf];
var deathQueue = [];//Queue of people to activate ondeath.

//Wait until thing starts

function initGame(){
    io.sockets.emit('moderator message', "Night falls, and the game begins...");
    roleDistribution = shuffle(roleDistribution);
    var shuffledPos = 0;
    for (var i = 0; i < globals.players.length; i++) {
        var role = roles[roleDistribution[shuffledPos++]]
        globals.players[i].role = role; 
        globals.playerSockets[globals.players[i].name].emit('role assigned', role.name);
    }
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
    main.serverSocket.emit("advance", JSON.stringify({key:globals.serverAuthKey}));
};

exports.advance = function() {
    // if (deathQueue.length > 0) {
    //     globals.currentPhase = death;
    //     var next = deathQueue.pop();
    //     next.apply();
    // }
    if (eval("advance"+phases[phasePos]+"();")) {
        //Is winner
        phasePos++;
        if (phasePos >= phases.length) {
            phasePos = 0;
        }
        announceDeaths();
        // main.serverSocket.emit('advance', {key:globals.serverAuthKey});
    }  
};

var announceDeaths = function() {
    for (var i = 0; i < globals.players.length; i++) {
        if (globals.players[i].dead) {
            main.io.sockets.emit('moderator message', globals.players[i].name + " is dead.");
        }
    }
    
};

var advanceNight = function() {
    if (nightOrderPos >= nightOrder.length)  {
        nightOrderPos = 0;
        return true;
    } else {
        activateRole(nightOrder[nightOrderPos++]);    
    }
    return false;
};
exports.advanceNight = advanceNight;

var activateRole = function (role) {
    var playersWithRole = globals.players.filter(function(e) {e.role == role;});
    io.sockets.emit('moderator message', role.name + ", wake up!");
    for (var i = 0; i < playersWithRole.length; i++) {
        playersWithRole[i].wakeup();
    }
    //set timeout(configrable)
    //TODO:WAIT FOR SIGNAL
    setTimeout(function() {applyRole(role);}, role.waitTime);
};

var applyRole = function(role) {
   role.completion();
   deactivateRole(role);
   main.serverSocket.emit("advance", JSON.stringify({key:globals.serverAuthKey}));
};

var runFirstNight = function () {
    //Add code when first round roles are introduced.
    //advance phase
    main.serverSocket.emit("eval", JSON.stringify({run:"game.advancePhase();", key:globals.serverAuthKey}));
};

var deactivateRole = function(role) {
    var playersWithRole = globals.players.filter(function(e) {return e.role == role;});
    io.sockets.emit('moderator message', role.name + ", go to sleep!");
    for (var i = 0; i < playersWithRole.length; i++) {
        playersWithRole[i].role.sleep(playersWithRole[i]);
    }
}

var runDawn = function() {
    
};

var runDay = function (){
    //reopen chat
    //start timer based on num players left
    var nominees={};
    while(timer>0){
        //constantly read nominations, nominations done via user list
        //be open to push requests from users with user pushing, target, and a boolean (nominating)
        //on push
            //needs to be more complex to allow shifting nomination directly and needs to print nominations/unnominations to chat
            //if(nominating){
                //nominees[target]++;
            //}else{
                //nominees[target]--;
            //}
    }
    window.clearTimeout(t);
    //close chat
    var targets={};
    //for(var nominee in nominees){
        //targets[nominee]=nominee;//for once JS's falsiness is useful
    //}
    //start voting timer
    timer=60;
    t=setTimeout(updateTimer("Voting",timer),1000);
    while(timer>0){
        //show nominees and allow votes to be cast, would probably be done with radio buttons
        //open to push requests with user, target, and a boolean
        //on push
            //if(voting){
                //targets[target].votes++;
            //}else{
                //targets[target].votes--;
            //}
    }
    window.clearTimeout(t);
    //for(var target in targets){
        //if(target.votes>Math.floor(numLivePlayers/2)){
            //reveal role
            //kill target
            //target.status="Dead";
            //target.onDeath();
        //}
    //}
    //if more than half of living players agree
        //kill target
        //reveal role
    //close chat
}


function getLivingPlayers() {
    var sum = 0;
    for (var i = 0; i < globals.players.length; i++) {
        if (globals.players[i].status == "Alive") {
            sum++;
        }
    }
    return sum;
}

function getMembersOfTeam(team) {
    var sum = 0;
    for (var i = 0; i < globals.players.length; i++) {
        if (globals.players[i].role.team == team) {
            sum++;
        }
    }
    return sum;
}

exports.roleDistribution = roleDistribution;
exports.initGame = initGame;
