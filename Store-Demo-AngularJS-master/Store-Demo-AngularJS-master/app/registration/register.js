(function(){
    'use strict';
    angular.module('Main')
    .controller('registerCtrl', ['$scope', '$state', '$timeout', 'localStorageService', 'toaster', function($scope, $state, $timeout, localStorageService, toaster){

        /*------ Variables -------*/
        //$scope.emailregex = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
        $scope.reg = {};

        //---- Runs before controller instantiation ----
        this.$onInit = function(){
            $('[data-toggle="popover"]').popover();
        };

        //---- Existing User Checker ----
        var existingUserChecker = function(){
            if(localStorageService.get($scope.reg.username) == null){
                return true;
            } else {
                toaster.pop('error', "Error!", "Username already in use!");
                $scope.reg.username = '';
                return false;
            }
        };

        //---- Existing Email Checker ----
        var existingEmailChecker = function(){
            var outcome = false;
            if(localStorageService.keys().length > 0){
                localStorageService.keys().forEach((user) => {
                    if(localStorageService.get(user).email !== $scope.reg.email){
                        outcome = true;
                    } else {
                        toaster.pop('error', "Error!", "Email already registered!");
                        $scope.reg.email = '';
                        outcome = false;
                    }
                });
            } else {
                return true;
            }
            return outcome;
        };

        //---- User registration method ----
        $scope.registerUser = function(){
            if(existingUserChecker() && existingEmailChecker()){
                localStorageService.set($scope.reg.username, {email: $scope.reg.email, pass: $scope.reg.pass});
                toaster.pop('info', "Registered!", "Your registration completed successfuly!");
                $timeout(function(){
                    $state.go('login');
                }, 3500);
            } else {
                toaster.pop('error', "Error!", "An error ocurred!");
            }            
        };



    }]);
})();