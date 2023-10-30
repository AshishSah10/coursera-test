(function () {
    'use strict';

    angular.module('MsgApp', [])
    .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];

    function CounterController($scope, $timeout){
        $scope.counter = 0;
        
        $scope.showNumberOfWatchers = function(){
            console.log($scope.$$watchers);
            console.log("# of Watchers: ", $scope.$$watchersCount);
        }
 
        /**
         * using Angular specific service ($timeout)
         */
        $scope.incrementCounter = function(){
           $timeout(function(){
                $scope.counter++;
                console.log("counter incremented: ", $scope.counter);
           }, 2000);
        }
        

        /**
         * using $apply()
         */
        // $scope.incrementCounter = function(){
        //     setTimeout(function() {
        //         $scope.$apply(function(){
        //             $scope.counter++;
        //             console.log("Counter incremented: ", $scope.counter);
        //         });
        //     }, 2000);
        // }

        /**
         * using $digest()
         */
        // $scope.incrementCounter = function(){
        //     setTimeout(function() {
        //         $scope.counter++;
        //         console.log("Counter incremented: ", $scope.counter);
        //         $scope.$digest();
        //     }, 2000);
        // }

        // $scope.$watch('counter', function(oldValue, newValue){
        //     console.log("old value: ", oldValue);
        //     console.log("new value: ", newValue);
        // });
    }

    
})();
