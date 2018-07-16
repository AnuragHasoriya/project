(function() {
    angular
        .module("shoppingCart")
        .controller("profileController", profileController);

    profileController.$inject = ["$state", "$log", "$firebase", "toaster", "$location", "firebaseService"];

    function profileController($state, $log, $firebase, toaster, firebaseService, $location) {
       
        var vm = this;
        vm.profileForm = {};
        // var tokenId = firebase.auth().currentUser.getToken();
        // console.log(tokenId);
        // var user = firebase.auth().currentUser;
        //  firebaseService.tokenId()
        //     .then(function (data) { 
        //         tokenId = data;
        //     });
        vm.userProfile = function() {
                
                var url = $location.path();
               console.log(url);
            function writeUserData( firstname, lastname, email, dob, phoneno) {
                firebase.database().ref('user-profile/' + userId).set({
                  firstname : firstname,
                  lastname : lastname,
                  email : email,
                  dob : dob,
                  phone : phoneno
                });
            }
        }
    }
}) ();