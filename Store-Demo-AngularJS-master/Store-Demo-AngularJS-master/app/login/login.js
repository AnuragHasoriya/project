(function(){
    'use strict';
    angular.module('Main')
    .controller('loginCtrl', ['logOutStateService', 'localStorageService', '$state', 'toaster', 'shoppingCartUpdaterService', function(logOutStateService, localStorageService, $state, toaster, shoppingCartUpdaterService){
        
        /*---- Variables ----*/
        

        /*---- Methods ----*/
        this.$onInit = function(){
            logOutStateService.changeState(false); //---- Sets state of log out button
            shoppingCartUpdaterService.cartBadgeDisplayStateChange(false); //---- Sets state of display to false for cart
            $('[data-toggle="popover"]').popover();
        };
        
        //---- Login ----
        this.signIn = function(isValid){
            if(isValid){
                if(localStorageService.keys().indexOf(this.log.username) != -1){
                    localStorageService.keys().forEach((user) => {
                        if(localStorageService.get(user).pass == this.log.pass){
                            $state.go('main');
                        } else {
                            toaster.pop('error', "Error!", "Wrong Password! Check it and try again!");
                            this.log.pass = '';
                        }
                    });
                } else {
                    toaster.pop('error', "Error!", "User not found! Already registered?");
                    this.log.username = '';
                }
            } else {
                toaster.pop('error', "Error!", "Enter correct data and try again please!");
            }
            
        };

    }]);
})();