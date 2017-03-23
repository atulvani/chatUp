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
        vmHome.message = '';

        vmHome.getAuthor = getAuthor;
        vmHome.updateSelectedContact = updateSelectedContact;
        vmHome.postMessage = postMessage;

        init();

        function init () {
            homeService.getContactList(vmHome.user).then(function (response) {
                vmHome.contactList = response;
                vmHome.updateSelectedContact(vmHome.contactList[0]);
            });
        }

        function getAuthor (userId) {
            if (vmHome.user.id === userId) {
                return vmHome.user;
            } else {
                return _.find(vmHome.contactList, {user: {id: userId}}).user;
            }
        }

        function updateSelectedContact (contact) {
            vmHome.selectedContact = contact;
        }

        function postMessage (contact) {
            if (!vmHome.message.trim()) { return; }
            homeService.postMessage(vmHome.selectedContact.user.id, vmHome.message.trim());

            // TODO: user $sce here to bind as html
            vmHome.selectedContact.conversationList.push({author: vmHome.user, message: vmHome.message});
            vmHome.message = '';
        }
    }
})();
