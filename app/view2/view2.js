'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {

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

}]);