'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

        $http.get("/SmartEnergyData").success(function(response) {
            console.log("Response: " + response);
            $scope.houses = response;
        });

    }]);