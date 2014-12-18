function User(name) {
    this.name = name;
    this.role = gameRoles.villager;
    this.status = "Spectating";
    this.defended = false;
    this.isPlaying=true;
    this.nominating={};
}
User.prototype.beginDay=function(){
    this.defended=false;
};
User.prototype.attacked=function(attacker){
    if(!this.defended) {
        this.status = "Dead";
    }
};