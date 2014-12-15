var socket = io.connect('http://localhost:3000');

function submitUsername() {
    socket.emit('user connect', $("#username-input").val())
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
