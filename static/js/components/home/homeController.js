'use strict';

(function () {
    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['homeService', '$sce', '$rootScope'];
    function homeController (homeService, $sce, $rootScope) {
        var vmHome = this;

        vmHome.user = $rootScope.user;
        vmHome.contactList = [];
        vmHome.selectedContact = null;
        vmHome.conversationList = []; // TODO: let service own and manipulate this data
        vmHome.message = '';

        vmHome.updateSelectedContact = updateSelectedContact;
        vmHome.postMessage = postMessage;

        init();

        function init () {
            homeService.getContactList(vmHome.user).then(function (response) {
                vmHome.contactList = response;
                vmHome.updateSelectedContact(vmHome.contactList[0]);
            });
        }

        function updateSelectedContact (contact) {
            vmHome.selectedContact = contact;
            homeService.getConversationHistory(vmHome.user, contact).then(function (response) {
                vmHome.conversationList = response;
            });
        }

        function postMessage (contact) {
            if (!vmHome.message.trim()) { return; }

            // TODO: user $sce here to bind as html
            vmHome.conversationList.push({author: vmHome.user, message: vmHome.message});
            vmHome.message = '';
        }
    }
})();
