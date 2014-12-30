var socket = io.connect('http://localhost:3000');
var role;
var players;
var name;
var nominated = [];
var busy=false;

document.addEventListener('keydown', function(event) {});

function submitUsername() {
    name = $("#username-input").val();
    //setTimeout(function(){},500);
    socket.emit("validate",name);
}
function validate(valid){
    if(typeof(players)!="undefined") {
        for (var c = 0; c < players.length; c++) {
            if (players[c].name.valueOf() == name.valueOf()) {
                valid = false;
            }
        }
    }
    if(name===""){
        valid=false;
    }
    if(valid) {
        socket.emit('user connect', name);
        //TODO: Check if it's valid name!
        $("#username-dialog").hide();
    }
}

function sendMessage (){
    socket.emit('user chat message', JSON.stringify({sender:displayName, text:$('#user-message').val()}));
}
    
socket.on('chat message', function(msg){
    msg = JSON.parse(msg);
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading">' + msg.sender +':</h5>' + msg.text + '</div></div>');
});

socket.on('moderator message', function(msg){
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading" style="color: red"> Moderator </h5><div style="color: red">' + msg + '</div></div></div>');
});

socket.on('update users', function(playerString) {
    players = JSON.parse(playerString);
    $("#userEntries").empty();
    nominated = _.unique(_.map(players, function(p) {return p.nominated;}));
    console.log(nominated);
    nominated = nominated.filter(function(item) {return !(item === undefined || item === null);});
    var menuStr = roleMenuString();
    for (var i = 0; i < players.length; i++) {
        var targetStr = menuStr.replace(/@TARGET/g, players[i].name);
        var iconStr = targetStr.replace(/@ICON/, getIcons(players[i]));
        $("#userEntries").append(iconStr);
    }
});

socket.on('role assigned', function(r) {
    role = roles[r];
    $("#roleName").html("<h3>"+ r + "</h3> ");
    var menuStr = roleMenuString();
    $("#userEntries").empty();
    for (var i = 0; i < players.length; i++) {
        var targetStr = menuStr.replace(/@TARGET/g, players[i].name);
        var iconStr = targetStr.replace(/@ICON/, getIcons(players[i]));
        $("#userEntries").append(iconStr);
    }
});

function roleMenuString(phase) {
    var actions = [];
    var str = "";
    // if (phase == "day") {
    actions = [{action:"nominate", title:"Nominate" }, {action:"vote", title:"Vote" }];
    // } 
    if (role != undefined) {
        actions = actions.concat(role.day.concat(role.night));
    }
     for (var i = 0; i < actions.length; i++) {
         //$TARGET gets replaced with the user when it gets integrated with the action
         str += '<li onclick="doAction(\''+ actions[i].action + '\', \'@TARGET\' );"><a>' + actions[i].title + '</a></li>'; 
     } 
    return  '<div class="btn-group" role="group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">@TARGET @ICON <span class="caret"></span></button> <ul class="dropdown-menu" role="menu">' + str + '</ul></div>';
}

function getIcons(p) {
    var ret = "";
        if (p.dead) {
            ret += 'Dead ';
        } 
        if (nominated.indexOf(p.name) !== -1) {
            ret += 'Nominated ';
        }
    return ret;
}

function doAction(action, target) {
    var actionpost = {user:name, "action":action, "target":target};
    socket.emit("action", JSON.stringify(actionpost));
}

socket.on('role assigned', function(role) {
    console.log(role);
   $("#roleName").html("<h3 class=\""+role.team+"\">"+ role + "</h3> ");
});

socket.on("reject name",function(){
    $(".form-group").append("<span class=\'glyphicon glyphicon-remove-sign form-control-feedback\'></span>")
    $(".form-group").addClass("has-error has-feedback");
});
socket.on("accept name",function(name){
    socket.emit("user connect", name);
    $("#username-dialog").hide();
});
