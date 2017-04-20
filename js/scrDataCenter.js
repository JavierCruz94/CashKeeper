$(document).ready(function() {
    console.log($("#entryDate").val());
    //---------------------------------------------
    //DO EVERYTHING AFTER CHECKING IF SESSION OPEN
    //----------------------------------------------
    var jsonToSend = {
        action : "CHECKSESSION"
    }
    $.ajax({
         url: "data/applicationLayer.php",
         type: "POST",
         data: jsonToSend,
         dataType: "json",
         contentType: "application/x-www-form-urlencoded",
         success: function(jsonResponse) {
             //---------------------
            //Chart loading
             //-----------------
            loadChart();
            function loadChart() {
                var jsonToSend = {
                action : "GETCHARTDATA"
                }
                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                     console.log("Datacenter nice");
                         // Load the Visualization API and the corechart package.
                      google.charts.load('current', {'packages':['corechart']});
                      // Set a callback to run when the Google Visualization API is loaded.
                      google.charts.setOnLoadCallback(drawChart);

                      // Callback that creates and populates a data table,
                      // instantiates the pie chart, passes in the data and
                      // draws it.
                      function drawChart() {
                        var jsonToSend = {
                        action : "GETCHARTDATA"
                    }
                        $.ajax({
                             url: "data/applicationLayer.php",
                             type: "POST",
                             data: jsonToSend,
                             dataType: "json",
                             contentType: "application/x-www-form-urlencoded",
                             success: function(jsonResponse) {
                             console.log("Datacenter nice");
                                 // Load the Visualization API and the corechart package.
                              google.charts.load('current', {'packages':['corechart']});

                              // Set a callback to run when the Google Visualization API is loaded.
                              google.charts.setOnLoadCallback(drawChart);

                              // Callback that creates and populates a data table,
                              // instantiates the pie chart, passes in the data and
                              // draws it.
                              function drawChart() {

                                // Create the data table.
                                var data = new google.visualization.DataTable();
                                data.addColumn('string', 'Category');
                                data.addColumn('number', 'Expenses');
                                var test = 150;
                                data.addRows([
                                  ['Food/Drinks', jsonResponse.food],
                                  ['Car', jsonResponse.car],
                                  ['Living', jsonResponse.living],
                                  ['Nightlife', jsonResponse.nightlife],
                                  ['Kids', jsonResponse.kids],
                                  ['Work', jsonResponse.work],
                                  ['Other', jsonResponse.other]
                                ]);

                                // Set chart options
                                var options = {'title':'How Much Did I spend this Month?',
                                               'width':600,
                                               'height':300};

                                // Instantiate and draw our chart, passing in some options.
                                var chart = new google.visualization.BarChart(document.getElementById('firstgraph'));
                                chart.draw(data, options);
                                }
                             },
                             error: function(errorMessage) {
                                 console.log("Datacenter bad");
                                 alert(errorMessage.responseText);
                             }
                        });

                        // Create the data table.
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Category');
                        data.addColumn('number', 'Money');
                        var test = 150;
                        data.addRows([
                          ['Food/Drinks', jsonResponse.food],
                          ['Car', jsonResponse.car],
                          ['Living', jsonResponse.living],
                          ['Nightlife', jsonResponse.nightlife],
                          ['Kids', jsonResponse.kids],
                          ['Work', jsonResponse.work],
                          ['Other', jsonResponse.other]
                        ]);

                        // Set chart options
                        var options = {'title':'How Much Did I spend this Month?',
                                       'width':600,
                                       'height':300};

                        // Instantiate and draw our chart, passing in some options.
                        var chart = new google.visualization.BarChart(document.getElementById('firstgraph'));
                        chart.draw(data, options);
                        }
                     },
                     error: function(errorMessage) {
                         console.log("Datacenter bad");
                         alert(errorMessage.responseText);
                     }
                });
             }
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
                            expinc : $("input[name=expinc]:checked").val(),
                            category : $("#category option:selected").text(),
                            date : $("#entryDate").val()
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
                                loadChart();
                               //window.location.replace("home.html");
                             },
                             error: function(errorMessage) {
                                 alert(errorMessage.responseText);
                             }
                        });
                });

             $("#clearDataButton").on("click", function() {
                 $("#DataDescription").val("")
                 $("#DataAmount").val("");
             });

             //----------------
             //LOGOUT
             //----------------
             $("#logout").on("click", function() {
                 var jsonToSend = {
                     action : "LOGOUT"
                 }
                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                         window.location.replace("landingpage.html");
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
             });

             //INITIAL TABLE
             loadExpenses("Food/Drinks");
             loadIncomes("Food/Drinks");

             //CAHNGING TABLE
             $("#categoryInc").change(function() {
                 loadIncomes($("#categoryInc option:selected").text());
             });
             $("#categoryExp").change(function() {
                 loadExpenses($("#categoryInc option:selected").text());
             });


             //---------------------------------
             //OUTCOME ENTRIES
             //---------------------------------
             function loadExpenses ($category) {
                var jsonToSend = {
                 action : "GETENTRIES",
                 type : "expense",
                 category : $category
                }

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        $newHtml = "";
                        for (var i = 1; i < jsonResponse.length; i++) {
                            $newHtml += "<tr><td>" + jsonResponse[i].description + "</td><td>" + jsonResponse[i].amount + "</td></tr>";
                        }

                        $("#includeOutcome").append($newHtml);

                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
             }

             //---------------------------------
             //INCOME ENTRIES
             //---------------------------------
             function loadIncomes ($category) {
                var jsonToSend = {
                 action : "GETENTRIES",
                 type : "income",
                 category : $category
                }

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        $newHtml = "";
                        for (var i = 1; i < jsonResponse.length; i++) {
                            $newHtml += "<tr><td>" + jsonResponse[i].description + "</td><td>" + jsonResponse[i].amount + "</td></tr>";
                        }

                        $("#includeIncome").append($newHtml);
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
             }

         },
         error: function(errorMessage) {
             alert("NEED TO START SESSION!");
             window.location.replace("landingpage.html");
         }
    });
});

