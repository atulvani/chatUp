'use strict';

(function() {
    angular
        .module('app', ['ngRoute', 'ngMaterial'])
        .config(config)
        .controller('appController', appController);

    config.$inject = ['$locationProvider', '$routeProvider'];
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});

        $routeProvider.when('/', {
            templateUrl: '/js/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vmHome'
        }).when('/home', {
            templateUrl: '/js/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vmHome'
        }).otherwise('/');
    }

    appController.$inject = [];
    function appController() {
        var vmApp = this;

        vmApp.name = 'Atul Vani';
    }
})();
