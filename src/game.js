var chat = require("./chatServer.js")
var main = require("../app.js");
var io = main.io;
var players = chat.people;
var gameRoles = require('./roles.js').gameRoles;
var gameRunning = false;
var userList= chat.people;
var numLivePlayers=0;
var wolfCount=0;
var villageCount=0;
var roleDistribution = ["Villager", "Villager", "Villager", "Werewolf"];

//Wait until thing starts
//
function initGame(){
    gameRunning = true;
    io.sockets.emit('moderator message', "Night falls, and the game begins...");
    roleDistribution = shuffle(roleDistribution);
    var shuffledPos = 0;
    for (var i = 0; i < chat.people.length; i++) {
        var role = gameRoles[roleDistribution[shuffledPos++]]
        players[i].role = role; 
        chat.peopleSockets[players[i].name].emit('role assigned', role.name);
    }
}

function shuffle(arr){ //v1.0
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

function run(){
    while(!isWinner()){
        runNight();
        runDay();
    }
}
function isWinner(){
    //TODO: Change to faction count. People can be of multiple factions. 
    //TODO:Actually, that might be more complicated to determine winners.
    if(getMembersOfTeam("Wolves") > getMembersOfTeam("Village") || getMembersOfTeam("Wolves") == 0){
        return true;
    }
    return false;
}

function runFirstNight() {
    //Add code when first round roles are introduced.
}

function runNight(){
    var order = [bodyguard, wolves, seer, witch];
    //activate bodyguard
    //for(var user in userList){
        //if(user.role==roles.bodyguard){
            //user.role.activate();
        //}
    //}
    activateWolves();
    //activate seer
    //for(var user in userList){
        //if(user.role==roles.seer){
            //user.role.activate();
        //}
    //}
    //activate witch
    //for(var user in userList){
        //if(user.role.name=="Witch"){
            //user.role.activate();
        //}
    //}
}
function runDay(){
    //reopen chat
    //start timer based on num players left
    var nominees={};
    var timer=(numLivePlayers/2)*60;
    var t=setTimeout(updateTimer("Day",timer),1000);
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

function updateTimer(phase,timer){
    timer--;
    var s=timer;
    var m=0;
    while(s>60){
        m++;
        s-=60;
    }
    jQuery($("timer")).html("");
    jQuery($("timer")).append("<h4 class=\"row\">"+phase+"</h4><h3 class=\"row\">"+m+":"+s+"</h3>");
}

function activateWolves(){
    //reopen wolf chat
    //display live users
    //start timer
    var timer=30;
    var t=setTimeout(updateTimer("Wolves",timer),1000);
    while(timer>0){
    }
    //target with enough votes dies
}

function getLivingPlayers() {
    var sum = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].status == "Alive") {
            sum++;
        }
    }
    return sum;
}

function getMembersOfTeam(team) {
    var sum = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].team == team) {
            sum++;
        }
    }
    return sum;
}

exports.gameRunning = gameRunning;
exports.roleDistribution = roleDistribution;
exports.initGame = initGame;
