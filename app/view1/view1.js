'use strict';

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

        $http.get("/SmartEnergyData").success(function(response) {
            $scope.dataset = response;
        });

        $scope.updateChart = function() {
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Water Consumption', 'Electricity Consumption'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40], // TODO This needs to be simulated!!
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        };

        $scope.updateChart();

    }]);