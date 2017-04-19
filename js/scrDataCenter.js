$(document).ready(function() {
    console.log("File loaded");
    $("#addForm").hide();

    $("#addButton").on("click", function() {
    console.log("File loaded again!");
        $("#addForm").toggle();
    });

    $("#addDataButton").on("click", function() {
            console.log("Test");
            var jsonToSend = {
                    action : "ADDDATAENTRY",
                    description : $("#DataDescription").val(),
                    amount : $("#DataAmount").val(),
                    uid : 1,
                    expinc : $("input[name=expinc]:checked").val(),
                    category : $("#category option:selected").text()
                }
                console.log("NICE");

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        console.log("NICE");
                       alert("Added " + jsonResponse.description + " " + jsonResponse.amount + "!");
                       //window.location.replace("home.html");
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
        });


});

