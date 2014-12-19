var socket = io.connect('http://localhost:3000');
var players;

function submitUsername() {
    name = $("#username-input").val();
    socket.emit("getPlayers");
    setTimeout(function(){},500);
    var valid=true;
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
    socket.emit('user chat message', JSON.stringify({sender:name, text:$('#user-message').val()}));
}
    
socket.on('chat message', function(msg){
    msg = JSON.parse(msg);
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading">' + msg.sender +':</h5>' + msg.text + '</div></div>');
});

socket.on('moderator message', function(msg){
    msg = JSON.parse(msg);
    $('#messages').append( '<div class="media conversation"> <div class="media-body"> <h5 class="media-heading" style="color: red"> Moderator </h5><div style="color: red">' + msg.text + '</div></div></div>');
});

socket.on('update users', function(playerString) {
    players = JSON.parse(playerString);
    $("#userEntries").empty();
    for (var i = 0; i < players.length; i++) {
        $("#userEntries").append("<tr> <td>" + players[i].name + "</td> <td>" + players[i].status + "</td> </tr>");
    }
});

socket.on('role assigned', function(role) {
    console.log(role);
   $("#roleName").html("<h3>"+ role + "</h3> ");
});

socket.on("setPlayers",function(playerString){
    players=JSON.parse(playerString);
});