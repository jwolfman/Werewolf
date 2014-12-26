function User(name) {
    this.name = name;
    this.role = null;
    this.status = "Spectating";
    this.defended = false;
    this.isPlaying=true;        
    this.silenced = false;
    this.nominated={};
    this.awake = true;
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

User.prototype.beginDay=function(){
    this.defended=false;
    this.silenced = false;
};

User.prototype.attacked=function(attacker){
    if(!this.defended) {
        this.status = "Dead";
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
