(function() {
    "use strict"
    angular
        .module("shoppingCart")
            .controller("registrationController", registrationController);

        registrationController.$inject = ["$state", "firebaseService", "toaster", "$timeout"];

        function registrationController($state, firebaseService, toaster, $timeout) {

            var vm = this;
            vm.user = {};
            vm.anurag = function() {
                $("[data-toggle = 'popover']").popover();
            };

            // vm.goToLogin = function() {
            //     $state.go("login");
            // }

            vm.registerUser = function() {
                firebaseService.signUp(vm.user.email, vm.user.password)
                    .then(firebaseServiceSuccess)
                    .catch(firebaseServiceFail);
            }
            
            function firebaseServiceSuccess(user) {
                var currentuser = firebase.auth().currentUser;
                var actionCodeSettings = {
                    url : "http://localhost:8080/#!/profile" + currentuser.email,
                    handleCodeInApp : false
                }

                firebaseService.emailVerify(currentuser, actionCodeSettings)
                    .then(emailVerifySuccess)
                    .catch(emailVerifyFaliure);
            }

            
            function firebaseServiceFail(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                   toaster.pop("error", "Error!", "Weak Password");
                alert("weak password");
                } else {
                    toaster.pop("error", "Error!", "Please try again");
                    alert(errorMessage);
                }
            }   

            function emailVerifySuccess() {
                // alert("please check your email");
                toaster.pop("info", "Email verify", "Please complete your profile");
                $state.go("login");
            }

            function emailVerifyFaliure() {
                toaster.pop("error", "Error!", "Please try again");
                alert("unable to send email");
            }
        
        } 
})();