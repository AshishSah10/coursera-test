(function () {
    'use strict';

    angular.module('DIApp', [])
    .controller('DIController', DIController);

    function DIController($scope, $filter){
        $scope.name = "Ashish Sah";

        $scope.upper = function(){
            var upperCase = $filter('uppercase');
            $scope.name = upperCase($scope.name);
        };
    }
})();
