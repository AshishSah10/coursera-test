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
        var canclerArray = [];
        console.log("inside start");
        $ctrl.$onInit = function(){
            var cancleListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
                $ctrl.showSpinner = true;
            });
            canclerArray.push(cancleListener);
    
            cancleListener = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                $ctrl.showSpinner = false;
            });
            canclerArray.push(cancleListener);
    
            cancleListener = $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
                $ctrl.showSpinner = false;
            });
            canclerArray.push(cancleListener);
        };

        $ctrl.$onDestroy = function(){
            canclerArray.forEach(function(cancleListenerFunction){
                cancleListenerFunction();
            });
        };

    }
}

)();