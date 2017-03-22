'use strict';

(function() {
    angular
        .module('app', ['ngRoute', 'ngMaterial', 'ngSanitize'])
        .config(config)
        .controller('appController', appController);

    config.$inject = ['$locationProvider', '$routeProvider'];
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});

        $routeProvider.when('/', {
            templateUrl: '/js/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vmHome',
            resolve: {auth: function (authService) { return authService.auth(); }}
        }).otherwise('/');
    }

    appController.$inject = [];
    function appController() {
        var vmApp = this;
    }
})();
