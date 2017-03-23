'use strict';

(function() {
    angular.module('app').factory('authService', authService);

    authService.$inject = ['$mdDialog', '$rootScope'];
    function authService($mdDialog, $rootScope) {
        var that = this;
        return {
            auth: function() {
                return firebase.auth().signInWithPopup($rootScope.authProvider).then(function(response) {
                    console.log(response);
                    $rootScope.user = {
                        id: response.user.uid,
                        name: response.user.displayName,
                        email: response.user.email,
                        avatar: response.user.photoURL
                    };
                    $rootScope.socket = io();
                }).catch(function(error) {
                    console.error(error);
                    if (error.code === 'auth/popup-blocked') {
                        return $mdDialog
                            .show($mdDialog.alert({
                                title: 'Allow Popup',
                                textContent: 'Please enable popups in your borwser and then hit "Continue".',
                                ok: 'Continue'
                            }))
                            .then(function () {
                                location.reload();
                            });
                    }
                });
            }
        };
    }
})();
