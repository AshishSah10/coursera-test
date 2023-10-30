(function(){
    'use strict'
    angular.module('ShoppingList').
    controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory){
        var list = this;

        var shoppingListService = ShoppingListFactory();

        list.itemName = "";
        list.itemQuantity = "";

        var orignalTitle = "Shooping List #1";

        list.items = shoppingListService.getItems();

        list.title = orignalTitle+" ( "+list.items.length+" Items)";

        list.warning = "Cookies Detected!!";

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
}

)();