'use strict';

(function () {
    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['homeService', '$rootScope'];
    function homeController (homeService, $rootScope) {
        var vmHome = this;

        vmHome.user = $rootScope.user;
        vmHome.homeService = homeService;
        vmHome.selectedContact = null;
        vmHome.selectedChatGroup = null;

        vmHome.getAvatar = getAvatar;
        vmHome.getUser = getUser;
        vmHome.updateSelectedChatGroup = updateSelectedChatGroup;

        function getAvatar (id) {
            return getUser(id).avatar || 'http://lorempixel.com/200/200/people';
        }

        function getUser (id) {
            if ($rootScope.user.id === id) { return $rootScope.user; }
            return _.find(homeService.getContactList(), {id: id});
        }

        function updateSelectedChatGroup (contact) {
            _.set(vmHome, 'selectedContact.hasUpdates', false);
            vmHome.selectedContact = contact;
            vmHome.selectedChatGroup = homeService.getChatGroup(contact.id);
            _.set(vmHome, 'selectedContact.hasUpdates', false);
        }
    }
})();
