(function () {
    'use strict';

    angular.module("ShoppingApp", [])
    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)
    .service("ShoppingListService", ShoppingListService);


    ShoppingListAddController.$inject = ['ShoppingListService'];
    function ShoppingListAddController(ShoppingListService){
        var addController = this;

        addController.itemName = "";
        addController.itemQuantity = "";

        addController.addItem = function(){
            ShoppingListService.addItem(addController.itemName, addController.itemQuantity);
        }
    }

    ShoppingListShowController.$inject = ['ShoppingListService'];
    function ShoppingListShowController(ShoppingListService){
        var showController = this;

        showController.items = ShoppingListService.getItems();

        showController.removeItem = function(itemIndex){
            ShoppingListService.removeItem(itemIndex);
        }
    }


    function ShoppingListService(){
        var service = this;

        var items = [];
        
        service.addItem = function(itemName, itemQuantity){
            var item = {
                itemName: itemName,
                quantity: itemQuantity
            }
            items.push(item);
        }

        service.getItems = function(){
            return items;
        }

        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1);
        }

    }
    
})();