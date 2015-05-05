database = {
    development : {
        host : "127.0.0.1",
        user: "werewolf",
        password : "j0shisw0lfman",
        database : "werewolf"
    },
    production : {},
    test : {}
};
var mode = 'development';

exports.database = database;
exports.mode = mode;
