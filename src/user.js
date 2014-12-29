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
    this.dead = true;
}

exports.User = User;
