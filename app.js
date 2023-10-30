(function() {
    'use strict'
    var x = 10;

    angular.module('myFirstApp', [])
    .controller('MyFirstController', function($scope) {
        $scope.name = "Ashish";
        $scope.sayHello = function(){
            return "Hello "+$scope.name;
        };

    })
    .controller("MyCalculatorController", function($scope){
        $scope.name = "";
        $scope.totalNumericValue = 0;
        $scope.displayNumericValue = function(){
            var totalNumericValue = computeTotalNumericValueForString($scope.name);
            $scope.totalNumericValue = totalNumericValue;
        };

        function computeTotalNumericValueForString(string){
            var totalNumericValue = 0;
            for(var i = 0; i < string.length; i++){
                totalNumericValue += string.charCodeAt(i);
            }
            return totalNumericValue;
        }
    });
})();

const getData = function(){
    console.log("fetching data.............");
}

let counter = 0;

const debouncing = function(func, delay) { 
    let timer;
    counter++;
    return () => {
       let arg = arguments;
       let context = this;
       console.log("inside debounincg: "+counter);
       clearTimeout(timer);
       timer = setTimeout(() => {
         func.apply(context, arg);
       }, delay); 
    };
}

const throttling = function(func, delay){
    let interval;
    let flag = true;
    return function() {
        if(flag){
            let arg = arguments;
            let context = this;
            console.log("inside trottling")
            func.apply(context, arg);
            flag = false;
            setInterval(() => {
                flag = true;
            }, delay); 
        }
    }
}
  
const onclickHandler = throttling(getData, 5000);
  
  
const onkeyupHandler = debouncing(getData, 5000);
console.log(onkeyupHandler);
