( function(){
    'use strict';

    angular.module("ShoppingList")
    .service("ShoppingListService", ShoppingListService);

    ShoppingListService.$inject = ['$q', '$timeout'];
    function ShoppingListService($q, $timeout){
        var service = this;

        var items = [];

        items.push({
            name: "Suger",
            quantity: "2 Kg"
        });

        items.push({
            name: "Brown Suger",
            quantity: "2.5 Kg"
        });
        
        items.push({
            name: "Bread",
            quantity: "1 packet"
        });

        service.getItems = function(){
            var deferred = $q.defer();

            $timeout( function(){
                deferred.resolve(items);
            }, 800 );

            return deferred.promise;
        };
    }
} )();