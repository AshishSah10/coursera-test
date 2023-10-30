(function () {
    'use strict';

    angular.module("ShoppingListDirectiveApp", [])
    .controller("ShoppingListController1", ShoppingListController1)
    .controller("ShoppingListController2", ShoppingListController2)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .directive("shoppingList", ShoppingList);

    function ShoppingList(){
        var ddo = {
            templateUrl: "shoppingList.html",
            scope: {
                list: "=myList",
                title: "@listTitle"
            }
        }
        return ddo;
    }

    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory){
        var list = this;

        var shoppingListService = ShoppingListFactory();

        list.itemName = "";
        list.itemQuantity = "";

        var orignalTitle = "Shooping List #1";

        list.items = shoppingListService.getItems();

        list.title = orignalTitle+" ( "+list.items.length+" Items)";

        list.addItem = function(){
            shoppingListService.addItem(list.itemName, list.itemQuantity);
            list.title = orignalTitle+" ( "+list.items.length+" Items)";
        }

        list.removeItem = function(itemIndex){
            shoppingListService.removeItem(itemIndex);
            list.title = orignalTitle+" ( "+list.items.length+" Items)";
        }
    }


    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory){
        var list = this;

        var shoppingListService = ShoppingListFactory(3);

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function(){
            try{
                shoppingListService.addItem(list.itemName, list.itemQuantity);
            }
            catch(error){
                list.errorMessage = error.message;
            }
        }

        list.items = shoppingListService.getItems();

        list.removeItem = function(itemIndex){
            shoppingListService.removeItem(itemIndex);
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

    function ShoppingListFactory(){
       var factory = function(maxItems){
         return new ShoppingListService(maxItems);
       }
       return factory;
    }

    
})();