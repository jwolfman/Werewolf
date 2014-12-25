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
        attacker:"none",
        explanation:"Wake every night with the other wolves to kill a player and work with them to kill off all opposing players."
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
        attacked:false,
        explanation:"Try to find and lynch the hostile roles during the day."
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
        },
        explanation:"Wake up every night and try to find the werewolves to help the village."
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
        },
        explanation:"Wake every night to find out who's dying. You have one kill potion and and one healing potion that you can use in the night. You are on the village team."
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
        target:"",
        explanation:"Wake up every night to protect a player. You can protect yourself but you can't protect the same person two nights in a row. You are on the village team."
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
        target:"",
        explanation:"At the beginning of the game pick two players to be lovers. Those players win together, die together, and cannot vote for one another. You are on the village team."
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
        target:"When you die pick another player to kill. You are on the village team."
    }
};

exports.gameRoles = gameRoles;
