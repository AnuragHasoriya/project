(function() {
    "use strict";
    angular
        .module("Main", ["ui-router"])
            .config(configMain)
            .run(runBlock);
        
        configMain.$inject = ["$urlRouteProvier"];
        function configMain($urlRouteProvier) {
            $urlRouteProvier.otherwise("/register");
        };

        runBlock.$inject = ["$http"];
        function runBlock($http) {

        };
}) ();