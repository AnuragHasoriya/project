(function(){
    'use strict'

    angular.module('Main', ['ngAnimate', 'ui.router', 'LocalStorageModule', 'toaster', 'common.services', 'productResourceMock'])
    
    .config(["$stateProvider", "$urlRouterProvider", "localStorageServiceProvider", function($stateProvider, $urlRouterProvider, localStorageServiceProvider){
        
        $stateProvider
        .state('login',
            {
                url: "/login",
                views:{
                    nav:{
                            templateUrl: "app/nav/nav.html",
                            controller: "navCtrl as nav"
                    },
                    content:{
                        templateUrl: "app/login/login.html",
                        controller: "loginCtrl as login"
                    }
                }               
            }
        )

        .state('register',
            {
                url: "/register",
                 views:{
                    nav:{
                            templateUrl: "app/nav/nav.html",
                            controller: "navCtrl as nav"
                    },
                    content:{
                        templateUrl: "app/registration/register.html",
                        controller: "registerCtrl"
                    }
                }
            }
        )

        .state('main',
        {
            url: "/main",
            views:{
                    nav:{
                            templateUrl: "app/nav/nav.html",
                            controller: "navCtrl as nav"
                    },
                    content:{
                        templateUrl: "app/store/store.html",
                        controller: "mainCtrl as store"
                    }
                }
        })
        
        .state('checkout', {
            url: "/checkout",
            views:{
                    nav:{
                            templateUrl: "app/nav/nav.html",
                            controller: "navCtrl as nav"
                    },
                    content:{
                        templateUrl: "app/checkout/checkout.html",
                        controller: "checkOutCtrl as vm"
                    }
                }
        });
        $urlRouterProvider.otherwise("/login");

        localStorageServiceProvider
            .setPrefix('login')
            .setStorageType('localStorage')
        }]);

})();