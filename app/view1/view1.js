'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

        $http.get("/SmartEnergyData").success(function(response) {
            console.log("Response: " + response);
            $scope.houses = response;
        });

        $scope.searchHouses = function(wel_address) {
            var wel_address_data = {WEL_Address: wel_address};
            $http.post("/Houses", wel_address_data).success(function(response) {
                console.log("From server: " + response);
                $scope.houses = response;
            });
        };

        $scope.selectHouse = function(house) {
            $rootScope.testvar = house.WEL_Address + ' ' + house.Postal_Code;
        };

    }]);