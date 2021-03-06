(function() {
    angular
        .module("shoppingCart")
            .run(runBlock)
            .config(configRoutes);

    configRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    
    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state("shoppingCart", {
                cache : true,
                views : {
                    "" : {
                        templateUrl : "app/components/landing/landing.html"
                    },
                    "header" : {
                        templateUrl : "app/shared/layout/header.html"
                    },
                    "footer" : {
                        templateUrl : "app/shared/layout/footer.html"
                    }
                }
            })
            .state("shoppingCart.dashboard", {
                cache : true,
                url : "/dashboard",
                views : {
                    "header" : {
                        templateUrl : "app/shared/layout/header.html",
                        controller : "headerController as $hd"
                    },
                    "footer" : {
                        templateUrl : "app/shared/layout/footer.html"
                    },
                    "content" : {
                        templateUrl : "app/components/dashboard/dashboard.html"
                    }
                    
                }
            })
            .state("profile", {
                cache : true,
                url : "/profile",
                templateUrl : "app/components/profile/profile.html",
                controller : "profileController as $pf"
            })
            .state("register", {
                cache : true,
                url : "/register",
                templateUrl : "app/components/register/register.html",
                controller : "registrationController as $rg"
            })
            .state('loading', {
                url: '/loading',
                cache: false,
                template: '<div ng-init="vm.redirect()"></div>',
                controller: 'LoadingCtrl'
            })
            .state("login", {
                cache : true,
                url : "/login",
                templateUrl : "app/components/login/login.html",    
                controller : "loginController as $lg"
            });
            //$locationProvider.html5Mode(true);    
    }

    runBlock.$inject = ["$rootScope", "$transitions", "$state"];

    function runBlock($rootScope, $transitions, $state) {
        
        $transitions.onSuccess({to: true }, ($transition) => {
           
            if($transition.$from() == $transition.$to()){
                $state.go('loading');
            }
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) { 
                    var currentUser = user;
                    if(currentUser === null) {
                        if ($transition.$to().name !== 'login') {
                            $state.go("login");
                        }
                    } else if ($transition.$to().name === 'login') {
                        // $state.go('loading');
                        $state.go('login');
                    }
                } else  {
                        if($transition.$to().name === "register") {
                            $state.go("register");
                        } else {
                        $state.go("login");
                        }
                }
            });
        });
    }
    
})();

// $transitions.onSuccess({to: true }, ($transition) => {
    // if($transation.$to().name !== "shoppingCart.register")
//     if($transition.$from() == $transition.$to()){
//         $state.go('loading');
//     }
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) { 
//             var currentUser = user;
//             if(currentUser === null) {
//                 if ($transition.$to().name !== 'login') {
//                     $state.go("login");
//                 }
//             } else if ($transition.$to().name === 'login') {
//                     $state.go('loading');
//                 }
//         } else if($transation.$to().name !== "shoppingCart.register") {
//             $state.go("login");
//         }
//     });
// });