$(document).ready(function() {
    $("#RegisterButton").on("click", function() {

        if ($("#RegisterName").val() != "" && $("#RegisterMail").val() != "" && $("#RegisterPassword").val() != "" && $("#RegisterPasswordConf").val() != "") {
            if ($("#RegisterPassword").val() == $("#RegisterPasswordConf").val()) {
                var jsonToSend = {
                    action : "REGISTER",
                    mail : $("#RegisterMail"),
                    pass : $("#RegisterPassword"),
                    name : $("#RegisterName")
                }

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
            else {
                alert("Passwords don't match");
            }
        } else {
            alert("Fill every field");
        }

    });
});
