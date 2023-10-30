(function () {
    'use strict';

    angular.module("ShoppingListComponentApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListFactory", ShoppingListFactory)
    .service("WeightLossFilterService", WeightLossFilterService)
    .component("shoppingList", {
        templateUrl: "shoppingList.html",
        controller: ShoppingListComponentController,
        bindings: {
            title: "@myTitle",
            items: "<",
            onRemove: "&"
        },
    })
    .component("loadingSpinner", {
        templateUrl: 'spinner.html',
        controller: SpinnerController
    });

    SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope){
        var $ctrl = this;

        var cancleListener = $rootScope.$on('shoppingList:processing', function(event, data){
            console.log("event: ", event);
            console.log("data: ", data);
            if(data.on){
                $ctrl.showSpinner = true;
            }
            else{
                $ctrl.showSpinner = false;
            }
        });

        $ctrl.$onDestroy = function(){
            cancleListener();
        };

    }

    ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
    function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService){
        var $ctrl = this;
        var totalItems;

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
            totalItems = 0;
        }

        $ctrl.$onChanges = function(changeObj){
            console.log("changes: ", changeObj);
        }

        $ctrl.$doCheck = function(){
            if($ctrl.items.length !== totalItems){
                totalItems = $ctrl.items.length;

                $rootScope.$broadcast("shoppingList:processing", {on:true});
                var promises = [];
                for(let i = 0; i < $ctrl.items.length; i++){
                    promises.push(WeightLossFilterService.checkItemName($ctrl.items[i].itemName));
                }

                $q.all(promises)
                .then(function(result){
                    // Remove cookie warning
                    var warningElem = $element.find('h4.error');
                    warningElem.slideUp(900);
                })
                .catch(function(result){
                    // show cookie warning
                    var warningElem = $element.find('h4.error');
                    warningElem.slideDown(900);
                })
                .finally(function(){
                    $rootScope.$broadcast("shoppingList:processing", {on:false});
                })

                // console.log("# of items changed, Checking for Cookies!!");
                // if($ctrl.cookiesInList() === true){
                //     // show warnings
                //     console.log("Cookies detected in the list");
                //     var warningElem = $element.find("h4.error");
                //     warningElem.slideDown(900);
                // }
                // else{
                //     // hide warnings
                //     console.log("No Cookies in list, good to move ahead");
                //     var warningElem = $element.find("h4.error");
                //     warningElem.slideUp(900);
                // }
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