(function(){
    'use strict'
    angular.module('Spinner')
    .component('loadingSpinner', {
        templateUrl: 'src/spinner/loadingspinner.template.html',
        controller: SpinnerController
    })


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
}

)();