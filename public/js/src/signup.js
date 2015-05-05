function checkAvalaibility(name) {
    $.post('/user', {username:name}, function(res) {
        console.log(res);
    });
};

$(document).ready( function() {
    $("#signupForm").validate({
        debug: true,
        submitHandler : function(form) {$(form).ajaxSubmit();},
        rules : {
            "username" : {
                required : true
            },
            "password" : {
                required : true
            },
            "passConfirm" : {
                equalTo : "#password"
            },
        },
        messages : {
            "username" : {required : "You must create a username."},
            "password" : { required : "You must create a password."},
            "passConfirm" : { required: "You must confirm your password.", equalTo :"Passwords must match."}
        }
    });
});
