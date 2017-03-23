'use strict';

(function () {
    angular
        .module('app')
        .factory('homeService', homeService);

    homeService.$inject = ['$q', '$rootScope'];
    function homeService ($q, $rootScope) {
        var contactList = [{
                user: {id: 1, name: 'Jane Doe', email: 'jane.doe@gmail.com', avatar: 'http://lorempixel.com/200/200/people?jane'},
                conversationList: [
                    {authorId: 1, message: 'hey there', timestamp: ''},
                    {authorId: $rootScope.user.id, message: 'hiii!!!', timestamp: ''},
                    {authorId: 1, message: 'how you doing', timestamp: ''},
                    {authorId: $rootScope.user.id, message: 'm gud, hru', timestamp: ''},
                    {authorId: $rootScope.user.id, message: 'busy!!!!!', timestamp: ''},
                    {authorId: 1, message: 'kinda :(', timestamp: ''},
                ]
            }, {
                user: {id: 2, name: 'Jasmine Doe', email: 'jd@gmail.com', avatar: 'http://lorempixel.com/200/200/people?jasmine'},
                conversationList: [
                    {authorId: $rootScope.user.id, message: 'hiii!!!', timestamp: ''},
                    {authorId: 2, message: 'how are you', timestamp: ''},
                    {authorId: $rootScope.user.id, message: 'm gud, hru', timestamp: ''},
                    {authorId: 2, message: 'me good too :)', timestamp: ''},
                ]
            }];

        socket.on('newMessage', function (data) {
            console.log(data);
        });

        return {
            getContactList: function (user) {
                return $q.resolve(contactList);
            },
            postMessage: function (userId, message) {
                // socket.emit('postMessage', {});
                return $q.resolve(true);
            }
        };
    }
})();
