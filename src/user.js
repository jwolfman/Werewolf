function User(name, socket) {
    this.name = name;
    this.socket = socket;
    this.role = null;
    this.defended = false;
    this.awake = true;
    this.silenced = false;
    this.nominated="";
    this.votedFor="";
    this.awake = true;
    this.killed = false; //Has been killed this turn?
    this.dead = false;
}

User.prototype.changeDisplayName=function(name){
    this.displayName=name;
}

User.prototype.eventCalls = function(event) {
    for (var i = 0; i < this.role[event].length; i++) {
        var actioncall = this.role[event][i];
        actioncall = actioncall.split(":");
        this[actioncall[0]](JSON.parse(actioncall[1]));
    }
};

User.prototype.showAllies = function () {
    var allies = [];
    for (p in players) {
        if ( p.role.indexOf != -1) {
            if (p != this && this.role.allies.indexOf(p.role) != -1) {
                allies.push(p.name);
            }
        }
    }
    peopleSockets[this.name].emit("allies updated", JSON.stringify(allies));
};

exports.User = User;
