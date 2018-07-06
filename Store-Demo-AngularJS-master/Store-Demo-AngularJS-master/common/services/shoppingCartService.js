(function(){
    'use strict';

    angular.module('Main')

    .service('shoppingCartUpdaterService', [function(){

        //---- Variables ---- 
        this.cartBadgeDisplayState = {display: false};
        this.itemsOnCart = [];

        //---- Methods ----

        //---- Sets number of items on cart ----
        this.setItemsArray = function(itemsArray){
            this.itemsOnCart = itemsArray;
        };

        //---- Returns number of items on cart ----
        this.getItemsArray = function(){
            return this.itemsOnCart;
        };

        //---- Removes items from cart and updates the counter ----
        this.updateItemsArray = function(item){
            this.itemsOnCart.splice(item, 1);
            this.removeItemFromCart();
        };

        //---- Shows icon only in store view ----
        this.cartBadgeDisplayStateChange = function(state){
            this.cartBadgeDisplayState.display = state;
        };         

        //---- Increases shopping-cart amount ----
        this.addItemToCart = function(){
            this.actualAmountObj.quantity = ++this.actualAmountObj.quantity;
        };

        //---- Decreases shopping-cart amount ----
        this.removeItemFromCart = function(){
            this.actualAmountObj.quantity = --this.actualAmountObj.quantity;
        };

        //---- Initializes Shopping Cart ----
        this.initShoppingCart = function(){
            this.actualAmountObj = {quantity: 0}; //--- Value should be persisted to a cookie to update cart when user visits site again ---            
        };

        //---- Empties cart all at once ----
        this.emptyShoppingCart = function(){
            this.actualAmountObj.quantity = 0;
            this.itemsOnCart.length = 0;
            return this.actualAmountObj;
        };

        //---- Initializes Shopping Cart ----
        this.initShoppingCart();


    }]);

}());