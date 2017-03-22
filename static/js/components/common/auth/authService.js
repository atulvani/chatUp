'use strict';

(function() {
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$mdDialog'];
    function authService($mdDialog) {
        return {
            auth: function() {
                return $mdDialog.show({
                    templateUrl: '/js/components/common/auth/loginRegister.html',
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    controller: function($scope, $mdDialog, $rootScope) {
                        $scope.login = function() {
                            $rootScope.user = {name: 'John Doe'};
                            $mdDialog.hide();
                        }
                    }
                });
            }
        };
    }
})();
