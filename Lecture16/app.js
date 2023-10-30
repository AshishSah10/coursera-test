(function () {
    'use strict';

    angular.module('MsgApp', [])
    .controller('BindingController', BindingController);

    BindingController.$inject = ['$scope'];

    function BindingController($scope){
        $scope.firstName = "Ashish";
        // $scope.fullName = "";  when controller will be loaded fullName will be initialised with "" and AngularJs will remove its watcher

        $scope.showNumberOfWatchers = function(){
            console.log($scope.$$watchers);
            console.log("# of Watchers: ", $scope.$$watchersCount);
        }

        $scope.setFullName = function(){
            $scope.fullName = $scope.firstName + " "+ "Sah";
        }

        $scope.logFirstName = function(){
            console.log("firstName is: ", $scope.firstName);
        }

        $scope.logFullName = function(){
            console.log("FullName is: ", $scope.fullName);
        }
 
        
    }

    
})();