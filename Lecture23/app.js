(function () {
    'use strict';

    angular.module("AsyncShoppingApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .service("ShoppingListService", ShoppingListService)
    .service("WeightLossFilterService", WeightLossFilterService);


    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService){
        var list = this;

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function(){
            try{
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            }
            catch(error){
                list.errorMessage = error.message;
            }
        }

        list.items = ShoppingListService.getItems();

        list.removeItem = function(itemIndex){
            ShoppingListService.removeItem(itemIndex);
            list.errorMessage = "";
        }
    }


    ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
    function ShoppingListService($q, WeightLossFilterService){
        var service = this;

        var items = [];
        
        // service.addItem = function(itemName, itemQuantity){
        //     var promise = WeightLossFilterService.checkItemName(itemName);

        //     promise.then(function(response){
        //         var nextPromise = WeightLossFilterService.checkItemQuantity(itemQuantity);

        //         nextPromise.then(function(response){
        //             var item = {
        //                 itemName: itemName,
        //                 quantity: itemQuantity
        //             }
        //             items.push(item);
        //         }, function(errorResponse){
        //             console.log(errorResponse.message);
        //         });
        //     }, function(errorResponse){
        //         console.log(errorResponse.message);
        //     });
        // };

        // service.addItem = function(itemName, itemQuantity){
        //     var promise = WeightLossFilterService.checkItemName(itemName);

        //     promise.then(function(response){
        //         return WeightLossFilterService.checkItemQuantity(itemQuantity);
        //     })
        //     .then(function(response){
        //         var item = {
        //             itemName: itemName,
        //             quantity: itemQuantity
        //         }
        //         items.push(item);
        //     })
        //     .catch(function(errorResponse){
        //         console.log(errorResponse.message);
        //     })
        // };

        service.addItem = function(itemName, itemQuantity){
            var namePromise = WeightLossFilterService.checkItemName(itemName);
            var quantityPromise = WeightLossFilterService.checkItemQuantity(itemQuantity);

            $q.all([namePromise, quantityPromise])
            .then(function(response){
                var item = {
                    itemName: itemName,
                    quantity: itemQuantity
                }
                items.push(item);
            })
            .catch(function(errorResponse){
                console.log(errorResponse.message);
            });
        }

        

        service.getItems = function(){
            return items;
        }

        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1);
        }

    }


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
    
})();