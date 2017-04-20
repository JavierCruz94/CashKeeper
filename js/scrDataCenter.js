$(document).ready(function() {
    //---------------------------------------
    //DATE
    //------------------------------------------

    var d = new Date();
    var year = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[d.getMonth()];

    var datum = year + "-" + m + "-" + day;
    console.log(datum);
    $("#entryDate").val(datum);
    $("#entryDate").val(datum);

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
                                var chart = new google.visualization.PieChart(document.getElementById('firstgraph'));
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
                        var chart = new google.visualization.PieChart(document.getElementById('firstgraph'));
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
             loadIncomes("Work");

             //CAHNGING TABLE
             $("#categoryInc").change(function() {
                 loadIncomes($("#categoryInc option:selected").text());
             });
             $("#categoryExp").change(function() {
                 loadExpenses($("#categoryExp option:selected").text());
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
                        $("#includeOutcome").empty();
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
                        $("#includeIncome").empty();
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
             var totalincome = 0;
             var totaloutcome = 0;


             //--------------------------
             //Total Income
             //---------------------------
             var jsonToSend = {
                 action : "GETTOTAL",
                 type : 1
                }

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        console.log(jsonResponse);
                        totalincome = jsonResponse;
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });

             //--------------------------
             //Total OUTCOME
             //---------------------------
             var jsonToSend = {
                 action : "GETTOTAL",
                 type : 0
                }

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        console.log(jsonResponse);
                        totaloutcome = jsonResponse;
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });

<<<<<<< HEAD
             //-------------------------
             //Average
             //-------------------------
             var jsonToSend = {
                 action : "GETAVG",
                 category : $("#categoryExp option:selected").text()
                }

                $.ajax({
                     url: "data/applicationLayer.php",
                     type: "POST",
                     data: jsonToSend,
                     dataType: "json",
                     contentType: "application/x-www-form-urlencoded",
                     success: function(jsonResponse) {
                        console.log("Avg=" + jsonResponse);
                     },
                     error: function(errorMessage) {
                         alert(errorMessage.responseText);
                     }
                });
=======
                google.charts.load("current", {packages:['corechart']});
                google.charts.setOnLoadCallback(drawChart);
                function drawChart() {
                  var data = google.visualization.arrayToDataTable([
                    ["Type of Cash Flow", "Amount", { role: "style" } ],
                    ["Income", totalincome, "#89bdd3"],
                    ["Outcome", totaloutcome, "color: #e5e4e2"]
                  ]);

                  var view = new google.visualization.DataView(data);
                  view.setColumns([0, 1,
                                   { calc: "stringify",
                                     sourceColumn: 1,
                                     type: "string",
                                     role: "annotation" },
                                   2]);

                  var options = {
                    title: "Income Outcome Comparison",
                    width: 600,
                    height: 400,
                    bar: {groupWidth: "95%"},
                    legend: { position: "none" },
                  };
                  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
                  chart.draw(view, options);
              }
>>>>>>> origin/master
         },
         error: function(errorMessage) {
             alert("NEED TO START SESSION!");
             window.location.replace("landingpage.html");
         }
    });
});

