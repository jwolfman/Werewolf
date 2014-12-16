User=Entity.extend({
    init:function(){
        this.name="";
        this.role=gameRoles.villager;
        this.isAlive=true;
        this.defended=false;
    },
    beginDay:function(){
        this.defended=false;
    },
    attacked:function(attacker){
        if(!this.defended) {
            this.isAlive = false;
        }
    }
});