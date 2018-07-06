(function(){
    'use strict';
    angular.module('Main')
    .controller('mainCtrl', ['logOutStateService', 'productResource', 'shoppingCartUpdaterService', function(logOutStateService, productResource, shoppingCartUpdaterService){

        /*------ Variables -------*/
        var store = this;
        store.shoppingCart = [];

        /*---- Methods ----*/
        logOutStateService.changeState(true);
        shoppingCartUpdaterService.cartBadgeDisplayStateChange(true);
               
        productResource.query(function(data){
            store.products = data;
        });

        //---- Builds an array of length equal to the product number of stars so ng-repeat can iterate through it ----
        store.buildRating = function (stars){
            return new Array(stars);
        };

        //---- Adds selected items to Shopping-Cart ----------
        store.addItemToCart = function(item){
            store.shoppingCart.push(item);
            shoppingCartUpdaterService.addItemToCart();
            shoppingCartUpdaterService.setItemsArray(store.shoppingCart);
        };

        

    }]);
})();