//IMPORTANT: name and object identfier MUST MATCH! ROLE WILL BE undefined OTHERWISE!
//Completion is meant for enabling actions
var villager = require("./roles/villager.js");
var werewolf = require("./roles/Werewolf.js");

var gameRoles = {
    Villager: villager.villager,
    Werewolf: werewolf.werewolf
};

// var gameRoles = {
//     Werewolf:{
//         init:["showAllies"],
//         completion:function() {
//             var target = action.whoDidWerewolvesKill();
//             console.log(target);
//             if (!target.defended) {
//                 target.status = "Dead";
//             }
//         },
//         firstNight:[],
//         day:defaultDay,
//         night:[action.werewolfKill],
//         name:"Werewolf",
//         team:"Wolves",
//         value:"-6",
//         target:"",
//         waitTime:30000000
//     },
//     Villager:{
//         init:[],
//         name:"Villager",
//         team:"Village",
//         firstNight:"false",
//         value:"1",
//         image:"",
//         onDeath:"false",
//         special:"false",
//         onAttack:"false",
//         target:"",
//         attacked:false,
//         day:defaultDay,
//         night:defaultNight
//     },
//     Seer:{
//         name:"Seer",
//         team:"Village",
//         nightRole:"true",
//         firstNight:"false",
//         value:"7",
//         image:"",
//         onDeath:"false",
//         special:"true",
//         onAttack:"false",
//         target:"",
//         attacked:false,
//         activate:function(){
//             //show player list
//             //set target
//             //show target's team
//         }
//     },
//     Witch:{
//         name:"Witch",
//         team:"Village",
//         nightRole:"true",
//         firstNight:"false",
//         value:"4",
//         image:"",
//         onDeath:"false",
//         special:"true",
//         onAttack:"false",
//         target:"",
//         attacked:false,
//         hasKill:true,
//         hasHeal:true,
//         activate:function(){
//             //show dying player
//             //show remaining potions
//             //if heal
//                 //set attacked to false
//             //if kill
//                 //show player list
//                 //set targeted player's attacked stat to true and attacker to witch
//         }
//     },
//     Bodyguard:{
//         name:"Bodyguard",
//         team:"Village",
//         nightRole:"true",
//         firstNight:"false",
//         value:"3",
//         image:"",
//         onDeath:"false",
//         special:"true",
//         onAttack:"false",
//         target:""
//     },
//     Cupid:{
//         name:"Cupid",
//         team:"Village",
//         nightRole:"false",
//         firstNight:"true",
//         value:"-3",
//         image:"",
//         onDeath:"false",
//         special:"true",
//         onAttack:"false",
//         target:""
//     },
//     Hunter:{
//         name:"Hunter",
//         team:"Village",
//         nightRole:"false",
//         firstNight:"false",
//         value:"3",
//         image:"",
//         onDeath:"true",
//         special:"true",
//         onAttack:"false",
//         target:""
//     }
// };

exports.roles = gameRoles;
