$(document).ready(function() {
    $("#RegisterButton").on("click", function() {

        if ($("#RegisterName").val() == "" || $("#RegisterMail").val() == "" || $("#RegisterPassword").val() == "" || $("#RegisterPasswordConf").val() == "") {
            alert("Fill every field");
        } else {
            if ($("#RegisterPassword").val() != $("#RegisterPasswordConf").val()) {
                alert("Passwords don't match");
            } else {
                var jsonToSend = {
                    action : "REGISTER",
                    mail : $("#RegisterMail").val(),
                    pass : $("#RegisterPassword").val(),
                    name : $("#RegisterName").val()
                }
                //console.log("NICE");

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        console.log("NICE");
                       //alert("Welcome " + jsonResponse.fName + " " + jsonResponse.lName + "!");
                       //window.location.replace("home.html");
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
            }
        }
    });

    $("#LoginButton").on("click", function() {
        var jsonToSend = {
            action : "LOGIN",
            mail : $("#LoginMail").val(),
            pass : $("#LoginPassword").val()
        }

         $.ajax({
             url: "data/applicationLayer.php",
             type: "POST",
             data: jsonToSend,
             dataType: "json",
             contentType: "application/x-www-form-urlencoded",
             success: function(jsonResponse) {
                console.log("NICE log");
               //alert("Welcome " + jsonResponse.fName + " " + jsonResponse.lName + "!");
               //window.location.replace("home.html");
             },
             error: function(errorMessage) {
                 alert(errorMessage.responseText);
             }
        });
    });
});
