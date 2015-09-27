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
            //var identifier = -1;
            //if (month_counter > row_limit) {
            //    identifier = (month_counter % row_limit) - 1;
            //}
            //
            //console.log('identifier is: ' + identifier);

            $timeout(function() {
                // Temporary solution until using $q
                $('[id]').each(function (i) {
                    var ids = $('[id="' + this.id + '"]');
                    console.log('ids: ' + ids);
                    if (ids.length > 1) $('[id="' + this.id + '"]:gt(0)').remove();
                });
                console.log('Removing duplicate ids!');
            }, 10);
        };


        /*
            Updates the table based on the real time simulator

            Param: month: the current month
                   water: the current amount of water consumption
                   electricity: the current amount of electricity consumption
         */
        var updateTable = function(month, water, electricity) {

            console.log("Month_counter is: " + month_counter);

            $('#real_time_energy_consumption').append(
                "<tr id='real_time_energy_consumption" + month_counter+ "'>" +
                "<td>" + month + '</td>' +
                '<td>' + water + '</td>' +
                '<td>' + electricity + '</td>' +
                "</tr>"
            );

            // Ensure that the table never grows past 10 rows
            monitor_table(10);

            month_counter++;
        };


        /*
            Updates the line graph
         */
        var updateLineGraph = function() {
            try {
                // pass this in a query and send to server
                console.log($rootScope.g_home_address);
                var home_to_monitor = $rootScope.g_home_address._id;
                $http.put("/MonitorHouse/" + home_to_monitor).success(function(response) {
                    console.log("Updating chart!");
                    $scope.updateChart(month_counter);
                    updateTable(month_counter, response.Water_Consumption, response.Electricity_Consumption);
                });
            } catch(err) {
                console.log("No house selected");
            }
        };


        $scope.updateChart = function(index) {
            console.log('labels: ' + $scope.labels);

            $scope.labels = [month_counter,
                             month_counter + 1,
                             month_counter + 2,
                             month_counter + 3,
                             month_counter + 4,
                             month_counter + 5,
                             month_counter + 6
                            ];
            $scope.series = ['Water Consumption', 'Electricity Consumption'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
                $scope.data = [
                    [66, 66, 66, 66, 66, 66, 40], // TODO This needs to be simulated!!
                    [11, 48, 11, 19, 11, 27, 90]
                ];
            };

            $scope.onLoad = function() {
                console.log('Armed and ready!');
            }

        };


        /*
            Simulates real time data flow updating every 3 seconds
         */
        function simulate() {
            //updateLineGraph();

            setInterval(function() {
                updateLineGraph();
            }, 3000);
        };


        simulate();

        //var deferred = $q.defer();

}]);