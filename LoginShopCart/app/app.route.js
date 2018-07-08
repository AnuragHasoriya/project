(function() {
    angular
        .module("Main")
        .config(configureRoutes)
        .run(runBlock);
    
        configureRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];
        function configureRoutes($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("main", {
                    cache : true,
                    views : {
                        "" : { 
                            templateUrl : "components/landing/landing.html",
                        },
                        "footer@main" : {
                            templateUrl : "shared/layout/footer.html",
                        }
                     }
                })
                .state("registration@main", {
                    cache : true,
                    url : "/register",
                    views : {
                        content : {
                            templateUrl : "/components/RegisterForm/register.html",
                            controller : "registerController",
                            controllerAs : "vm",
                        }
                    }
                })

        }

        runBlock.$inject = ["$rootScope", "$state", "$urlRouter", "$timeout"];
        function runBlock($rootScope, $state, $urlRoute, $timeout) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                if (fromState.url == toStateUrl) {
                    event.preventDefault();
                }
            });
        }

}) ();