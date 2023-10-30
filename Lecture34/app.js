(function () {
    'use strict';

    angular.module("ShoppingListComponentApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .component("shoppingList", {
        templateUrl: "shoppingList.html",
        controller: ShoppingListComponentController,
        bindings: {
            title: "@myTitle",
            items: "<",
            onRemove: "&"
        },
    });

    ShoppingListComponentController.$inject = ['$element'];
    function ShoppingListComponentController($element){
        var $ctrl = this;
        var totalLength;

        $ctrl.cookiesInList = function(){
            for(var item of $ctrl.items){
                //console.log(item.itemName);
                if(item.itemName.toLowerCase().indexOf("cookie") !== -1){
                    return true;
                }
            }
            return false;
        }

        $ctrl.remove = function(myIndex){
            $ctrl.onRemove({ index : myIndex });
        };

        $ctrl.$onInit = function(){
            console.log("inside $oninit() method");
            totalLength = 0;
        }

        $ctrl.$onChanges = function(changeObj){
            console.log("changes: ", changeObj);
        }

        // $ctrl.$postLink = function(){
        //     $scope.$watch("$ctrl.cookiesInList()", function(newValue, oldValue){
        //         console.log($element);
        //         if(newValue == true){
        //             // show warning
        //             var warningElem = $element.find("h4.error");
        //             warningElem.slideDown(900);
        //         }
        //         else{
        //             // hide warnings
        //             var warningElem = $element.find("h4.error");
        //             warningElem.slideUp(900);
        //         }
        //     });
        // }

        $ctrl.$doCheck = function(){
            if($ctrl.items.length !== totalLength){
                console.log("# of items changed, Checking for Cookies!!");
                if($ctrl.cookiesInList() === true){
                    // show warnings
                    console.log("Cookies detected in the list");
                    var warningElem = $element.find("h4.error");
                    warningElem.slideDown(900);
                }
                else{
                    // hide warnings
                    console.log("No Cookies in list, good to move ahead");
                    var warningElem = $element.find("h4.error");
                    warningElem.slideUp(900);
                }
            }
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