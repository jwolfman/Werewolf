var socket = io.connect('http://localhost:3000');

function submitUsername() {
    socket.emit('user connect', $("#username-input").val())
    if(userList.length==0||userList.indexOf($("#username-input").val())==-1){
        var user=new User($("#username-input").val());
        userList.push(user);
    }
    $("#username-dialog").hide()
    printUserList();
}

function printUserList(){
    //userlists are not shared between sessions yet
    var list="#userEntries";
    jQuery(list).html("");
    for(var c=0;c<userList.length;c++){
        jQuery(list).append("<tr><td>"+userList[c].name+"</td><td>"+userList[c].status+"</td></tr>");
    }
}

$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
    
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
