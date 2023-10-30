( function () {
    angular.module("RoutingApp", ['ui.router']);

    angular.module("RoutingApp")
    .config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
    function RoutesConfig($stateProvider, $urlRouterProvider){

        // Redirects to "/tab1" if no other URL matches
        $urlRouterProvider.otherwise("/tab1");

        // Set up UI states
        $stateProvider
        .state("tab1", {
            url: "/tab1",
            template: "<div>This is TAB 1 content</div>"
        })
        .state("tab2", {
            url: "/tab2",
            templateUrl: "src/tab2.html"
        });
    }
} )();