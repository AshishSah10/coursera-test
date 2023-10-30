(function () {
    'use strict';

    angular.module('MsgApp', [])
    .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];

    function CounterController($scope){
        $scope.name = "Ashish Sah";

        $scope.counter = 0;
        
        $scope.showNumberOfWatchers = function(){
            console.log($scope.$$watchers);
            console.log("# of Watchers: ", $scope.$$watchersCount);
        }

        $scope.incrementCounter = function(){
            $scope.counter++;
        }

        $scope.$watch('counter', function(oldValue, newValue){
            console.log("old value: ", oldValue);
            console.log("new value: ", newValue);
        });
    }

    
})();
