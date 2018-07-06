(function() {
    angular
        .module("Main", ["ui-router"])
        .config(configureRoutes)
        .run(runBlock);
    
        configureRoutes.$inject = ["$stateProvider", "$urlRouteProvider"];
        function configureRoutes($stateProvider, $urlRouteProvider) {
            $stateProvider
                .state("main", {
                    cache : true,
                    views : {
                        "" : { 
                            templateUrl : "components/landing/landing.html",
                        },
                        "footer" : {
                            templateUrl : "shared/layout/footer.html",
                        }
                     }
                })
                .state("registration", {
                    cache : true,
                    url : "/register",
                    views : {
                        content : {
                            templateUrl : "components/registrationForm/registration.html",
                            controller : "registerController",
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