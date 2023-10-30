(function () {
    'use strict';

    angular.module('ControllerAsSyntaxApp', [])
    .controller('ParentController1', ParentController1)
    .controller('ChildController1', ChildController1)
    .controller('ParentController2', ParentController2)
    .controller('ChildController2', ChildController2);

    ParentController1.$inject = ['$scope'];
    function ParentController1($scope){
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 11;
    }

    ChildController1.$inject = ['$scope']; 
    function ChildController1($scope){
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("CHILD $scope: ", $scope);

        // masking $scope.parentValue 
        $scope.parentValue = 5;
        console.log("*** CHANGED: $scope.parentValue = 5 ***");
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("CHILD $scope: ", $scope);

        // masking $scope.pc
        //$scope.pc = {name:"Ashish"};
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        $scope.pc.parentValue = 4;
        console.log("*** CHANGED: $scope.pc.parentValue = 4 ***");
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("CHILD $scope: ", $scope);


        console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
        console.log("$scope.$parent.pc.parentValue: ", $scope.$parent.pc.parentValue);
    }

    // $scope is provided by Angular automatically we are just not using it here
    // so no need to inject it
    function ParentController2(){
        var vm = this;
        vm.value = 8;
    }

    ChildController2.$inject = ['$scope'];
    function ChildController2($scope){
        var child = this;
        child.value = 9;
        console.log("ChildController2 $scope: ", $scope)
    }
    
})();