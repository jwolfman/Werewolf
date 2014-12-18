var chat = require("./chatServer.js")
var main = require("../app.js");
var io = main.io;
var gameRunning = false;
var userList= chat.people;
var wolfCount=0;
var villageCount=0;
var roleDistribution;

//Wait until thing starts
//
function initGame(){
    var roles=$("#roleDistribution"); //Is th
    var i=0;
    gameRunning = true;
    io.sockets.emit('moderator message', "Night falls, and the game begins...");
    for(role in roles){
        roleDistribution[i]=role;
        i++;
    }
    shuffle(roleDistribution);
    i=0;
    for(var c=0;c<userList.length;c++){
        if(userList[c].isPlaying){
            userList[c].role=roleDistribution[i];
            if(userList[c].role.team=="village"){
                villageCount++;
            }else{
                wolfCount++;
            }
            i++;
        }
    }
    run();
}

function shuffle(roles){
    for(var c=0;c<roles.length;c++){
        var temp=roles[c];
        var num=Math.floor((Math.random()*roles.length)+c);
        roles[c]=roles[num];
        roles[num]=temp;
    }
}
function run(){
    while(!isWinner()){
        runDay();
        runNight();
    }
}
function isWinner(){
    //TODO: Change to faction count. People can be of multiple factions. 
    //TODO:Actually, that might be more complicated to determine winners.
    if(wolfCount>villageCount||wolfCount==0){
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
    //activate wolves
    //activate seer
    //activate witch
}
function runDay(){
    //reopen chat
    //start timer based on num players left
    //var timer=(numLivePlayers/2)*60
    //var t=setTimout(function(timer){timer--;},1000);
    //while(timer>0){
        //constantly read nominations
    //}
    //window.clearTimeout(t);
    //close chat
    //start voting timer
    //timer=60;
    //t=setTimeout(function(timer){timer--},1000);
    //while(timer>0){
        //show nominees and allow votes to be cast
    //}
    //if more than half of living players agree
        //kill target
        //reveal role
}
exports.gameRunning = gameRunning;
exports.roleDistribution = roleDistribution;
