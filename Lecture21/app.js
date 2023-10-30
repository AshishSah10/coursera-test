(function () {
    'use strict';

    angular.module("FactoryShoppingApp", [])
    .controller("ShoppingListController1", ShoppingListController1)
    .controller("ShoppingListController2", ShoppingListController2)
    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)
    .factory("ShoppingListFactory", ShoppingListFactory);


    ShoppingListController1.$inject = ['ShoppingListFactory', '$scope'];
    function ShoppingListController1(ShoppingListFactory, $scope){
        var shoppingListController1 = this;

        // Use Factory to create new ShoppingList Service
        $scope.shoppingListService = ShoppingListFactory();
    }

    ShoppingListController2.$inject = ['ShoppingListFactory', '$scope'];
    function ShoppingListController2(ShoppingListFactory, $scope){
        var shoppingListController2 = this;

        // Use Factory to create new ShoppingList Service
        // shoppingListController2.shoppingListService = ShoppingListFactory(3);
        $scope.shoppingListService = ShoppingListFactory(3);
        
        shoppingListController2.errorMessage = $scope.errorMessage;
    }

    ShoppingListAddController.$inject = ['$scope'];
    function ShoppingListAddController($scope){
        var addController = this;

        console.log("$scope ShoppingListAddController: ", $scope);

        addController.itemName = "";
        addController.itemQuantity = "";
 
        addController.service = $scope.$parent.shoppingListService;

        addController.addItem = function(){
            try{
                addController.service.addItem(addController.itemName, addController.itemQuantity);
            }
            catch(error){
                $scope.$parent.errorMessage = error;
            }
        }
    }

    ShoppingListShowController.$inject = ['$scope'];
    function ShoppingListShowController($scope){
        var showController = this;
        console.log("$scope ShoppingListShowController: ", $scope);


        showController.service = $scope.$parent.shoppingListService;
        

        showController.items = showController.service.getItems();
        

        showController.removeItem = function(itemIndex){
            showController.service.removeItem(itemIndex);
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
                throw new Error("max item limit reached");
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