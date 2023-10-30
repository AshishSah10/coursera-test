(function () {
    'use strict';

    var shoppingList1 = [
        "Milk", "Donuts", "Cookies", "Chocolates", "Peanut Butter", "Pepto Bismal",
        "Pepto Bismol(cholocate flavor)", "Pepto Bismol (cookie flavor)"
    ];

    var shoppingList2 = [
        {
            name : "Milk",
            quantity: "2"
        },
        {
            name : "Donuts",
            quantity: "200"
        },
        {
            name : "Cookies",
            quantity: "300"
        },
        {
            name : "Chocolates",
            quantity: "5"
        },
    ];

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope', '$filter'];

    function ShoppingListController($scope){
        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;


        $scope.addToList = function(){
            var newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            }
            $scope.shoppingList2.push(newItem);
        }
    }

    
})();