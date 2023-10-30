(function () {
    'use strict';

    angular.module("FactoryShoppingApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .provider("ShoppingListService", ShoppingListServiceProvider)
    .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'] // name+Provider
    function Config(ShoppingListServiceProvider){
        ShoppingListServiceProvider.config.maxItems = 2;
    }


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


    function ShoppingListService(maxItems){
        var service = this;

        var items = [];
        
        service.addItem = function(itemName, itemQuantity){
            if((maxItems === undefined) || (maxItems !== undefined && items.length < maxItems)){
                var item = {
                    itemName: itemName,
                    quantity: itemQuantity
                }
                items.push(item);
            }
            else{
                throw new Error("max item maxItems ("+maxItems+") limit reached");
            }
            
        }

        service.getItems = function(){
            return items;
        }

        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1);
        }

    }

    function ShoppingListServiceProvider(){
        var provider = this;

        provider.config = {
            maxItems: 10
        }

        provider.$get = function(){
            var service = new ShoppingListService(provider.config.maxItems);
            return service;
        }
    }

    
})();