var userList=new Array();
var wolfCount=0;
var villageCount=0;
function initGame(){
    var roles=$("#roleDistribution");
    var roleDistribution=[roles.length];
    var i=0;
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
    if(wolfCount>villageCount||wolfCount==0){
        return true;
    }
    return false;
}
function runNight(){
    //activate bodyguard
    //activate wolves
    //activate seer
    //activate witch
}
function runDay(){
    //reopen chat
    //start timer based on num players left
    //var timer=(numLivePlayers/2)*60
    //var t=setTimout(updateTimer("Day",timer),1000);
    //while(timer>0){
        //constantly read nominations
    //}
    //window.clearTimeout(t);
    //close chat
    //start voting timer
    //timer=60;
    //t=setTimeout(updateTimer("Voting",timer),1000);
    //while(timer>0){
        //show nominees and allow votes to be cast
    //}
    //window.clearTimeout(t);
    //if more than half of living players agree
        //kill target
        //reveal role
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