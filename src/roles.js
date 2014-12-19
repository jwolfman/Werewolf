//IMPORTANT: name and object identfier MUST MATCH! ROLE WILL BE undefined OTHERWISE!
var gameRoles = {
    Werewolf:{
        name:"Werewolf",
        team:"Wolves",
        nightRole:"true",
        firstNight:"false",
        value:"-6",
        image:"",
        onDeath:"false",
        special:"false",
        onAttack:"false",
        target:"",
        activate:function(){
            //show player list with allies marked
            //select target
            //if not protected
                //for target set attacked to true and attacker to werewolves
        },
        attacked:false,
        attacker:"none"
    },
    Villager:{
        name:"Villager",
        team:"Village",
        nightRole:"false",
        firstNight:"false",
        value:"1",
        image:"",
        onDeath:"false",
        special:"false",
        onAttack:"false",
        target:"",
        attacked:false
    },
    Seer:{
        name:"Seer",
        team:"Village",
        nightRole:"true",
        firstNight:"false",
        value:"7",
        image:"",
        onDeath:"false",
        special:"true",
        onAttack:"false",
        target:"",
        attacked:false,
        activate:function(){
            //show player list
            //set target
            //show target's team
        }
    },
    Witch:{
        name:"Witch",
        team:"Village",
        nightRole:"true",
        firstNight:"false",
        value:"4",
        image:"",
        onDeath:"false",
        special:"true",
        onAttack:"false",
        target:"",
        attacked:false,
        hasKill:true,
        hasHeal:true,
        activate:function(){
            //show dying player
            //show remaining potions
            //if heal
                //set attacked to false
            //if kill
                //show player list
                //set targeted player's attacked stat to true and attacker to witch
        }
    },
    Bodyguard:{
        name:"Bodyguard",
        team:"Village",
        nightRole:"true",
        firstNight:"false",
        value:"3",
        image:"",
        onDeath:"false",
        special:"true",
        onAttack:"false",
        target:""
    },
    Cupid:{
        name:"Cupid",
        team:"Village",
        nightRole:"false",
        firstNight:"true",
        value:"-3",
        image:"",
        onDeath:"false",
        special:"true",
        onAttack:"false",
        target:""
    },
    Hunter:{
        name:"Hunter",
        team:"Village",
        nightRole:"false",
        firstNight:"false",
        value:"3",
        image:"",
        onDeath:"true",
        special:"true",
        onAttack:"false",
        target:""
    }
};

exports.gameRoles = gameRoles;
