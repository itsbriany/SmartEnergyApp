'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {



        var loadLineGraph = function() {
            try {
                // pass this in a query and send to server
                console.log($rootScope.g_home_address);
                var home_to_monitor = $rootScope.g_home_address._id;
                $http.put("/MonitorHouse/" + home_to_monitor).success(function() {
                    console.log("Done!");
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

        loadLineGraph();

}]);