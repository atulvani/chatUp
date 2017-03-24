'use strict';

(function () {
    angular
        .module('app')
        .factory('homeService', homeService);

    homeService.$inject = ['$rootScope', '$timeout', '$http'];
    function homeService ($rootScope, $timeout, $http) {
        var contactList = [],
            chatGroupList = [];

        init();

        return {
            getContactList: function (user) { return contactList; },
            getChatGroup: getChatGroup,
            postMessage: postMessage
        };

        function init () {
            // TODO: fix this message getting lost at times, rendering user with no contacts to chat with
            $rootScope.socket.on('updateContactList', function (updatedContactList) {
                $timeout(function () {
                    contactList = updatedContactList;
                    _.remove(contactList, {id: $rootScope.user.id});
                });
            });
            $rootScope.socket.on('postMessage', function (author, message) {
                $timeout(function () {
                    getChatGroup(author).messageList.push({author: author, message: message});
                    _.find(contactList, {id: author}).hasUpdates = true;
                });
            });
        }

        function getChatGroup (id) {
            var chatGroup = _.find(chatGroupList, {authorList: [id, $rootScope.user.id].sort()});
            if (!chatGroup) {
                chatGroup = {authorList: angular.copy([id, $rootScope.user.id].sort()), messageList: []};
                chatGroupList.push(chatGroup);
                $http.get('/chat', {params: {authorList: chatGroup.authorList}}).then(function (response) {
                    Array.prototype.unshift.apply(chatGroup.messageList, response.data);
                    // TODO: fix duplicate chat messages near end of the list
                });
            }
            return chatGroup;
        }

        function postMessage (chatGroup) {
            if (_.isEmpty(_.trim(chatGroup.message))) { return; }
            chatGroup.messageList.push({author: $rootScope.user.id, message: chatGroup.message});
            $rootScope.socket.emit('postMessage', $rootScope.user.id, _.without(chatGroup.authorList, $rootScope.user.id)[0], chatGroup.message);
            chatGroup.message = '';
        }
    }
})();
