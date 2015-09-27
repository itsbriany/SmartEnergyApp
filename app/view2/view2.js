'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

        // Counts the number of months passed since monitoring the one house
        var month_counter = 0;

        /*
            Updates the table based on the real time simulator

            Param: month: the current month
                   water: the current amount of water consumption
                   electricity: the current amount of electricity consumption
         */
        var updateTable = function(month, water, electricity) {

            console.log("Month_counter is: " + month_counter);

            //if (month_counter == 0) {
            //    $('#real_time_energy_consumption' + month_counter).html(
            //        '<td>' + month + '</td>' +
            //        '<td>' + water + '</td>' +
            //        '<td>' + electricity + '</td>'
            //    );
            //} else {
                $('#real_time_energy_consumption').append(
                    "<tr id='real_time_energy_consumption'" + month_counter+ '>' +
                    "<td>" + month + '</td>' +
                    '<td>' + water + '</td>' +
                    '<td>' + electricity + '</td>' +
                    "</tr>"
                );
            //}
            month_counter++;
        };

        var updateLineGraph = function() {
            try {
                // pass this in a query and send to server
                console.log($rootScope.g_home_address);
                var home_to_monitor = $rootScope.g_home_address._id;
                $http.put("/MonitorHouse/" + home_to_monitor).success(function(response) {
                    console.log("Updating chart!");
                    $scope.updateChart(0);
                    updateTable(month_counter, response.Water_Consumption, response.Electricity_Consumption);
                });
            } catch(err) {
                console.log("No house selected");
            }
        };

        $http.get("/SmartEnergyData").success(function(response) {
            $scope.dataset = response;
        });

        $scope.updateChart = function(index) {
            $scope.labels = [index, "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Water Consumption', 'Electricity Consumption'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40], // TODO This needs to be simulated!!
                [28, 48, 40, 19, 86, 27, 90]
            ];

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
                $scope.data = [
                    [66, 66, 66, 66, 66, 66, 40], // TODO This needs to be simulated!!
                    [11, 48, 11, 19, 11, 27, 90]
                ];
            };

        };





        /*
            Simulates real time data flow updating every 3 seconds
         */
        function simulate() {
            updateLineGraph();
            updateLineGraph();
            updateLineGraph();
            //setInterval(function() {
            //
            //}, 3000);
        };


        simulate();


}]);