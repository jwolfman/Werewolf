var socket = io.connect('http://localhost:3000');
var role;
var players;
var name;
var statusIcons = { "alive":'<span class="glyphicon glyphicon-user"></span>',
                    "dead":'<span class="glyphicon glyphicon-skull"></span>',
                    "nominated":'<span class="glyphicon glyphicon-fire"></span>',
                    "ally":'<span class="glyphicon glyphicon-ok"></span>',
                    "spectator":'<span class="glyphicon glyphicon-eye"></span>'
                };

function submitUsername() {
    name = $("#username-input").val();
    socket.emit('user connect', name);
    //TODO: Check if it's valid name!
    $("#username-dialog").hide();
}

function sendMessage (){
    socket.emit('user chat message', JSON.stringify({sender:name, text:$('#user-message').val()}));
}
    
socket.on('chat message', function(msg){
    msg = JSON.parse(msg);
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading">' + msg.sender +'</h5>' + msg.text + '</div></div>');
});

socket.on('moderator message', function(msg){
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading" style="color: red"> Moderator </h5><div style="color: red">' + msg + '</div></div></div>');
});

socket.on('update users', function(playerString) {
    players = JSON.parse(playerString);
    $("#userEntries").empty();
    var menuStr = roleMenuString();
    for (var i = 0; i < players.length; i++) {
        var targetStr = menuStr.replace(/@TARGET/g, players[i].name);
        // var iconStr = targetStr.replace(/@ICON/, getIcons(players[i]));
        $("#userEntries").append(targetStr);
    }
});

socket.on('role assigned', function(r) {
    console.log(r);
    role = roles[r];
    $("#roleName").html("<h3>"+ r + "</h3> ");
    var menuStr = roleMenuString();
    $("#userEntries").empty();
    for (var i = 0; i < players.length; i++) {
        var targetStr = menuStr.replace(/@TARGET/g, players[i].name);
        // var iconStr = targetStr.replace(/@ICON/, getIcons(players[i]));
        $("#userEntries").append(targetStr);
    }
});

function roleMenuString(phase) {
    var actions = [];
    var str = "";
    // if (phase == "day") {
    actions = [{action:"nominate", title:"Nominate" }];
    // } 
    if (role != undefined) {
        actions = actions.concat(role.day.concat(role.night));
    }
     for (var i = 0; i < actions.length; i++) {
         //$TARGET gets replaced with the user when it gets integrated with the action
         str += '<li onclick="doAction(\''+ actions[i].action + '\', \'@TARGET\' );"><a>' + actions[i].title + '</a></li>'; 
     } 
    return  '<div class="btn-group" role="group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">@TARGET <span class="caret"></span></button> <ul class="dropdown-menu" role="menu">' + str + '</ul></div>';
}

function getIcons() {
    console.log(arguments);
    var ret = "";
    var items = ["alive", "dead", "nominated", "ally"];
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; i < items.length; j++) {
            if (players[i]["status"]  == items[j] || players[i][items[j]]) {
                ret.concat(statusIcons[items[j]]);
            }
        }
    }
    if (ret == "") {ret = statusIcons["spectator"];}
    return ret;
}

function doAction(action, target) {
    var actionpost = {user:name, "action":action, "target":target};
    socket.emit("action", JSON.stringify(actionpost));
}
