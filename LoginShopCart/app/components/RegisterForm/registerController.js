(function() {
"use strict";
angular.module("Main")
    .controller("registerController",registerController);

    registerController.$inject = ["$state", "$timeout", "localStorageService", "toaster"];

    function registerController($state, $timeout, localStorageService, toaster) {
        vm.reg = {};
        vm.$onInit = function() {
            $("[data-toggle = 'popover']").popover();
        }

        // validating new user
        function registerUser() {
            if( existingUserChecker() && existingEmailChecker()) {
                localStorageService.set(vm.reg.username, {email: vm.reg.email, pass: vm.reg.pass});
                toaster.pop("info", "Registered!", "Your registration completed successfuly!");
                $timeout(function() {
                    $state.go("main");
                }, 3500);
            } 
            else {
                toaster.pop("error", "Error!", "An error ocurred!");
            }            
        };

        //username validation
        function existingUserChecker() {
            if(localStorageService.get(vm.reg.username) == null) {
                return true;
            }
            else {
                toaster.pop("error", "Error!", "Username Already in use!");
            }
        }

        //userEmail validation
        function existingEmailChecker() {
            var outcome = false;
            if(localStorageService.keys().length > 0) {
                localStorageService.keys().forEach((user) => {
                    if(localStorageService.get(user).email !== vm.reg.email) {
                        outcome = true;
                    } 
                    else {
                        toaster.pop("error", "Error!", "Email already registered!");
                        vm.reg.email = "";
                        outcome = false;
                    }
                });
            } 
            else {
                return true;
            }
            return outcome;
        };

    }
})();