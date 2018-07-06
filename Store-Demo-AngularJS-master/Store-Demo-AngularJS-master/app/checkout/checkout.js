(function(){
    'use strict';

    angular.module('Main')
    .controller('checkOutCtrl', ['shoppingCartUpdaterService', 'toaster',  function(shoppingCartUpdaterService, toaster){

        //---- Variables ----
        var vm = this;
        vm.ship = {};
        vm.card = {};
        vm.bill = {};

        vm.card.Issuer = false;

        //---- Grabs items from cart ----
        vm.$onInit = function(){
            vm.items = shoppingCartUpdaterService.getItemsArray();
        };

        //---- Removes item from cart ----
        vm.removeItemFromCart = function(item){
            shoppingCartUpdaterService.updateItemsArray(item);
        };

        //---- Makes call to API payment method ----
        vm.makePayment = function(){
            if(vm.items.length > 0){
                $('#paymentModal').modal('toggle'); //---- Dismisses modal
                toaster.pop('info', "Payment completed successfuly!", "Your order will arrive shortly!");
                vm.items = shoppingCartUpdaterService.emptyShoppingCart(); //---- Empties shopping cart
                //---- Clears checkout forms ----
                vm.ship = {};
                vm.card = {}; //---- Not best way to clear object. For demo purposes only.
                vm.bill = {};
            } else {
                toaster.pop('error', "Error!", "You have no items in your shopping cart!");                
            }
            
        };

        //---- Credit Card Masking ----
        $("#card-number").credit({ auto_select: false });

    }]);

}());