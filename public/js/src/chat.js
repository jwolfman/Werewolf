var socket = io.connect('http://localhost:3000');
var players;

function submitUsername() {
    name = $("#username-input").val();
    socket.emit('user connect', name);
    //TODO: Check if it's valid name!
    $("#username-dialog").hide();
}


function sendMessage (){
    socket.emit('user chat message', JSON.stringify({sender:name, text:$('#player-message').val()}));
}
    
socket.on('chat message', function(msg){
    $('#message-list').append("<li>" + msg + "</li>");
});

socket.on('update users', function(playerString) {
    players = JSON.parse(playerString);
    $("#userTable-body").empty();
    for (var i = 0; i < players.length; i++) {
        $("#userTable-body").append("<tr> <td>" + players[i].name + "</td> <td>" + players[i].stat + "</td> </tr>");
    }
});
