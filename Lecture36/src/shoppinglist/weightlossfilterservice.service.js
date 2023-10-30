(function(){
    'use strict'
    angular.module('ShoppingList')
    .service("WeightLossFilterService", WeightLossFilterService);

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout){
        var weightLossFilterService = this;

        weightLossFilterService.checkItemName = function(itemName){
            var deferred = $q.defer();

            var result = {
                message: ""
            }

            $timeout(function(){
                if(itemName.toLowerCase().indexOf("cookie") === -1){
                    deferred.resolve(result);
                }
                else{
                    result.message = "Do not add Cookie";
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        }

        weightLossFilterService.checkItemQuantity = function(itemQuantity){
            var deferred = $q.defer();

            var result = {
                message: ""
            }

            $timeout(function(){
                if(itemQuantity < 6){
                    deferred.resolve(result);
                }
                else{
                    result.message = "Quantity must be less than 6";
                    deferred.reject(result);
                }
            }, 1000)

            return deferred.promise;
        }

    }
}

)();