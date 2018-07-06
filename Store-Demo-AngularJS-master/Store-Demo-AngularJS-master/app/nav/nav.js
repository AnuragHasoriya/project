(function(){
    'use strict'
    angular.module('Main')
    .controller('navCtrl', ['$timeout', 'logOutStateService', 'shoppingCartUpdaterService', 'navFactory', '$state', function($timeout, logOutStateService, shoppingCartUpdaterService, navFactory, $state){

        /*---- Variables ----*/
        var nav = this;

        $timeout(function(){
            nav.logout_state = logOutStateService.logOutState.display;   //---- Shows logout icon in view 
            nav.cart_state   = shoppingCartUpdaterService.cartBadgeDisplayState.display; //---- Shows cart icon/badge in view      
        });                

        //---- Watches for changes in the shopping cart and keeps it in sync. ----
        nav.itemsInCart = shoppingCartUpdaterService.actualAmountObj;        

        //---- Toggles modal in view ----
        nav.showModal = function(){
            //--- This contains actual items placed on cart to be deisplayed on modal ---
            nav.itemsOnCart = shoppingCartUpdaterService.getItemsArray();
            navFactory.showModal();
        };

        //---- Toggles Modal ----
        nav.dismissModal = function(){
            navFactory.hideModal();
            $state.go('checkout');
        };

        //---- Removes item from cart ----
        nav.removeItemFromCart = function(item){
            shoppingCartUpdaterService.updateItemsArray(item);
        };

        //---- Empties cart all at once ---
        nav.emptyCart = function(){
             nav.itemsInCart = shoppingCartUpdaterService.emptyShoppingCart();           
        };

    }])

    .factory('navFactory', [function(){

        //---- Modal toggle function moved to factory since best practice indicates no DOM manipulation must be made in controller. ----
        var showModal = function(){
            $('#cartModal').modal();
        };

        var hideModal = function(){
            $('#cartModal').modal('toggle');
        };

        return {
            showModal: showModal,
            hideModal: hideModal
        };

    }]);
})();