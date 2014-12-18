function User(name) {
    this.name = name;
    this.role = null;
    this.status = "Spectating";
    this.defended = false;
    this.isPlaying=true;        
    this.silenced = false;
    this.nominating={};
}

User.prototype.beginDay=function(){
    this.defended=false;
    this.silenced = false;
};

User.prototype.attacked=function(attacker){
    if(!this.defended) {
        this.status = "Dead";
    }
};


exports.User = User;
