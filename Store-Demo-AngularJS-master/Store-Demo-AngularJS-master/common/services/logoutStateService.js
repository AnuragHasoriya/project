(function(){
    'use strict';

    angular.module('Main')

    .service('logOutStateService', function(){

        //---- Variables ----
        this.logOutState = {display: false};

        //---- Methods ----
        this.changeState = function(state){
            this.logOutState.display = state;
        };

    });

})();