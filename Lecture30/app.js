(function () {
    'use strict';

    angular.module("ShoppingListDirectiveApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .directive("shoppingList", ShoppingList);

    function ShoppingList(){
        var ddo = {
            templateUrl: "shoppingList.html",
            scope: {
                title: "@myTitle",
                items: "<",
                badRemove: "=",
                onRemove: "&"
            },
            controller: ShoppingListDirectiveController,
            bindToController: true,
            controllerAs: "list"
        };
        return ddo;
    }

    
    function ShoppingListDirectiveController(){
        var list = this;

        list.cookiesInList = function(){
            for(var item of list.items){
                //console.log(item.itemName);
                if(item.itemName.toLowerCase().indexOf("cookie") !== -1){
                    return true;
                }
            }
            return false;
        }
    }

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory){
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
            console.log("this is: ", this);
            this.lastRemovedItem = "last remove item was: "+this.items[itemIndex].itemName;
            shoppingListService.removeItem(itemIndex);
            this.title = orignalTitle+" ( "+list.items.length+" Items)";
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