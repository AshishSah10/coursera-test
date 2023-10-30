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
            quantity: "2 Kg",
            description: "Suger used for baking delicious umm... baked goods."
        });

        items.push({
            name: "Wheat flour",
            quantity: "2.5 Kg",
            description: "High quality wheat flour."
        });
        
        items.push({
            name: "Bread",
            quantity: "1 packet",
            description: "Fresh Bread with high protein and fiber."
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