(function(){
    'use strict'

    angular.module('ShoppingList')
    .component('shoppingList', {
        templateUrl: "src/shoppinglist/shoppinglist.template.html",
        controller: ShoppingListComponentController,
        bindings: {
            title: "@myTitle",
            items: "<",
            onRemove: "&"
        },

    });

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
            }
        }
    }
}
)();