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
            $scope.dataset = response;
        });

        $scope.searchHouses = function(wel_address) {
            var wel_address_data = {WEL_Address: wel_address};
            $http.post("/Houses", wel_address_data).success(function(response) {
                console.log("From server: " + response);
                $scope.dataset = response;
            });
        };

        $scope.selectHouse = function(dataset) {
            //$rootScope.g_home_address = house.WEL_Address + ' ' + house.Postal_Code;
            $rootScope.g_home_address = {
                _id: dataset._id,
                WEL_Address: dataset.WEL_Address,
                Postal_Code: dataset.Postal_Code
            };
        };

    }]);