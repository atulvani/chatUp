'use strict';

(function() {
    angular.module('app', ['ngRoute', 'ngMaterial']).config(config).controller('appController', appController);

    config.$inject = ['$locationProvider', '$routeProvider'];
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});

        $routeProvider.when('/', {
            templateUrl: '/js/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vmHome',
            resolve: {auth: function(authService) { return authService.auth(); }}
        }).otherwise('/');
    }

    appController.$inject = ['$rootScope'];
    function appController($rootScope) {
        var vmApp = this;

        init();

        function init() {
            firebase.initializeApp({
                apiKey: "AIzaSyDI_ypt8ZJ0p9HzXIT65GH6HmZccGYo1kE",
                authDomain: "chatup-152b8.firebaseapp.com",
                databaseURL: "https://chatup-152b8.firebaseio.com",
                storageBucket: "chatup-152b8.appspot.com",
                messagingSenderId: "141318663409"
            });
            $rootScope.authProvider = new firebase.auth.GoogleAuthProvider();
        }
    }
})();
