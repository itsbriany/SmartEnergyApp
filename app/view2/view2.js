'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {


        // Counts the number of months passed since monitoring the one house
        var month_counter = 0;

        // The limit of the number of rows allowed in the table
        var row_limit = 6;


        /*
         Assures that the table does not go beyond 10 columns
         */
        var monitor_table = function() {
            $timeout(function() {
                // Temporary solution until using $q
                $('[id]').each(function (i) {
                    var ids = $('[id="' + this.id + '"]');
                    if (ids.length > 1) $('[id="' + this.id + '"]:gt(0)').remove();
                });
            }, 10);
        };


        /*
         Helper function that updates the indexed row on the table
         */
        var updateRow = function(identifier, month, cost, electricity) {
            $('#real_time_energy_consumption' + identifier).html(
                "<td>" + month + '</td>' +
                '<td>' + cost + '</td>' +
                '<td>' + electricity + '</td>' +
                "</tr>"
            );
        };


        /*
            Returns the total cost of electricity for one house
         */
        var calculate_electricity_cost = function(electricity) {
            return electricity * 0.17;
        };

        /*
            Updates the table based on the real time simulator

            Param: month: the current month
                   water: the current amount of water consumption
                   electricity: the current amount of electricity consumption
         */
        var updateTable = function (month, electricity) {

            console.log("Month_counter is: " + month_counter);

            var identifier = month_counter % row_limit;
            var electricity_cost = calculate_electricity_cost(electricity);

            // Wrap around the table
            updateRow(identifier, month, electricity_cost, electricity);

            // Ensure that the table never grows past 10 rows
            monitor_table(10);

            // Update the points on the table
            updatePoints(identifier, electricity_cost);

            month_counter++;
        };


        /*
            Updates the points on the graph
         */
        var updatePoints = function (identifier, electricity_cost) {

            var columns = 6;

            if (month_counter > columns) {

                console.log('Array values before: ' + $scope.data[0]);

                // Shift left
                for (var i = 0; i < columns; i++) {
                    var temp_data = $scope.data[0][i+1];
                    var temp_label = $scope.labels[i+1];
                    $scope.data[0][i] = temp_data;
                    $scope.labels[i] = temp_label;
                }

                $scope.data[0][columns-1] = electricity_cost;
                $scope.labels[columns-1] = month_counter;
                console.log('Array values after: ' + $scope.data[0]);

                return;
            }

            $scope.data[0][identifier] = electricity_cost;
            $scope.labels[identifier] = month_counter;

        };

        /*
            Updates the line graph
         */
         $scope.updateLineGraph = function() {
            try {
                // pass this in a query and send to server
                console.log($rootScope.g_home_address);
                var home_to_monitor = $rootScope.g_home_address._id;
                $http.put("/MonitorHouse/" + home_to_monitor).success(function(response) {
                    updateTable(month_counter, response.Electricity_Consumption);
                });
            } catch(err) {
                console.log("No house selected");
            }
        };

        $scope.loadChart = function () {

            // Load the labels
            $scope.labels = [];
            for (var i = 0; i < row_limit; i++) {
                $scope.labels[i] = month_counter + i;
            }

            // Initialize the series
            $scope.series = ['Cost of Electricity'];

            // Initialize the data
            $scope.data = [[]];
            var rows = 1;
            var columns = 6;

            for (var i = 0; i < rows; i ++) {
                for (var j = 0; j < columns; j++) {
                    $scope.data[i][j] = 0;
                }
            }

            $scope.onClick = function (points, evt) {

            };

        };


        /*
            Simulates real time data flow updating every 3 seconds
         */
        function simulate() {

            // Load the table
            loadTable();

            // Run the simulator
            setInterval(function() {
                $scope.updateLineGraph();
            }, 1000);
        }

        /*
            Loads the skeleton of the table
         */
        function loadTable() {
            for (var i = 0; i < row_limit; i++) {
                $('#real_time_energy_consumption').append(
                    "<tr id='real_time_energy_consumption" + i + "'>" +
                    '<td>Loading data...</td>' +
                    '<td>Loading data...</td>' +
                    '<td>Loading data...</td>' +
                    "</tr>"
                );
            }
            monitor_table();
        }

        simulate();

        $scope.loadChart();
}]);