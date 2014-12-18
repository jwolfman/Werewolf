function User(name, socket) {
    this.name = name;
    this.socket = socket;
    this.role = null;
    this.status = "Spectating";
    this.defended = false;
    this.isPlaying=true;        
}

User.prototype.beginDay=function(){
    this.defended=false;
};

User.prototype.attacked=function(attacker){
    if(!this.defended) {
        this.status = "Dead";
    }
};


