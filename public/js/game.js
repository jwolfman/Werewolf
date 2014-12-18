var userList=new Array();
var numLivePlayers=0;
var wolfCount=0;
var villageCount=0;
function initGame(){
    var roles=$("#roleDistribution");
    var roleDistribution=[roles.length];
    var i=0;
    for(var role in roles){
        roleDistribution[i]=role.val();
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
    numLivePlayers=i;
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
    var nominees={};
    var timer=(numLivePlayers/2)*60;
    var t=setTimeout(updateTimer("Day",timer),1000);
    while(timer>0){
        //constantly read nominations
        //be open to push requests from users with user pushing, target, and a boolean (nominating)
        //on push
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
        //targets[nominee]=true;
    //}
    //start voting timer
    timer=60;
    t=setTimeout(updateTimer("Voting",timer),1000);
    while(timer>0){
        //show nominees and allow votes to be cast
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
            //kill target
            //reveal role
        //}
    //}
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