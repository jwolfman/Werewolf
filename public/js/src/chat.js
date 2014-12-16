var socket = io.connect('http://localhost:3000');
var players;

function submitUsername() {
    socket.emit('user connect', $("#username-input").val());
    $("#username-dialog").hide();
}


$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
    
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});

socket.on('update users', function(playerString) {
    players = JSON.parse(playerString);
    $("#userTable-body").empty();
    for (var i = 0; i < players.length; i++) {
        $("#userTable-body").append("<tr> <td>" + players[i].name + "</td> <td>" + players[i].stat + "</td> </tr>");
    }
});
