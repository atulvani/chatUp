'use strict';

(function() {
    angular.module('app').factory('authService', authService);

    authService.$inject = ['$mdDialog', '$rootScope', '$q'];
    function authService($mdDialog, $rootScope, $q) {
        var that = this;
        return {
            auth: function() {
                return firebase.auth().signInWithPopup($rootScope.authProvider).then(function(response) {
                    var defered = $q.defer(),
                        user = {id: response.user.uid, name: response.user.displayName, email: response.user.email, avatar: response.user.photoURL};
                    $rootScope.socket = io();
                    $rootScope.socket.emit('registerUser', user);
                    $rootScope.socket.on('registerUser', function (newUser) {
                        $rootScope.user = user;
                        defered.resolve();
                    });
                    return defered.promise;
                }).catch(function(error) {
                    console.error(error);
                    if (error.code === 'auth/popup-blocked') {
                        return $mdDialog.show($mdDialog.alert({
                            title: 'Allow Popup',
                            textContent: 'Please enable popups in your borwser and then hit "Continue".',
                            ok: 'Continue'
                        })).then(location.reload);
                    } else {
                        $mdDialog.show($mdDialog.alert({
                            title: 'Authentication Error',
                            textContent: 'Error while logging in using Google. Please check your network settings.',
                            ok: 'Ok'
                        }));
                        return $q.reject(error);
                    }
                });
            }
        };
    }
})();
