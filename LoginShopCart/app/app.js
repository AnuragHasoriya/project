(function() {
    "use strict";
    angular
        .module("Main", ["ui.router", "ngAnimate", "toaster", "LocalStorageModule", "common.services"])
            .config(configMain)
            .run(runBlock);
        
        configMain.$inject = ["$urlRouterProvider"];
        function configMain($urlRouterProvider) {
            $urlRouterProvider.otherwise("/register");
        };

        function runBlock() {

        };
}) ();