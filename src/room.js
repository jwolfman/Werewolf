var ChatRoom=function(roomType,userArray){
    this.inRoom={};
    this.roomType=roomType;
    for(var c=0;c<userArray.length;c++){
        this.inRoom[userArray[c]]=true;
    }
    this.updateUserList();
}
ChatRoom.property.updateUserList=function(){
    var users=[];
    for(var user in this.inRoom){
        var temp=User(user.name,null);
        temp.dead=user.dead;
        users.push(temp);
    }
    io.sockets.emit("update users",JSON.stringify(users));
}
ChatRoom.prototype.addUser=function(user){
    this.inRoom[user]=true;
    //inform users of player joining the room
    this.updateUserList();
}
ChatRoom.prototype.removeUser=function(user){
    delete this.inRoom[user];
    //inform users of player leaving the room
    this.updateUserList()
}