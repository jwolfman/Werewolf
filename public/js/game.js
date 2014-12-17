var userList=new Array();
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
    for(user in users){
        if(user.isPlaying){
            user.role=roleDistribution[i];
            i++;
        }
    }
}
function shuffle(roles){
    for(var c=0;c<roles.length;c++){
        var temp=roles[c];
        var num=Math.floor((Math.random()*roles.length)+c);
        roles[c]=roles[num];
        roles[num]=temp;
    }
}