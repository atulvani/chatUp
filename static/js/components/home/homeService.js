'use strict';

(function () {
    angular
        .module('app')
        .factory('homeService', homeService);

    homeService.$inject = ['$q'];
    function homeService ($q) {
        return {
            getContactList: function (user) {
                return $q.resolve([
                    {name: 'Jane Doe'},
                    {name: 'Jasmine Doe'},
                ]);
            },
            getConversationHistory: function (user, contact) {
                return $q.resolve([
                    {author: user, message: 'hey there'},
                    {author: contact, message: 'hiii!!!'},
                    {author: user, message: 'how you doing'},
                    {author: contact, message: 'm gud, hru'},
                    {author: contact, message: 'busy!!!!!'},
                    {author: user, message: 'kinda :('},
                ]);
            }
        };
    }
})();
