'use strict';

(function () {
    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = [];
    function homeController () {
        var vmHome = this;

        vmHome.contactList = [];
        vmHome.selectedContact = null;
        vmHome.conversationList = [];

        vmHome.postMessage = postMessage;

        init();

        function init () {
            vmHome.contactList = [{name: 'Atul Vani'}, {name: 'Monica Vani'}, {name: 'Gaurav Vani'}];
            vmHome.selectedContact = vmHome.contactList[0];
            vmHome.conversationList = [
                {author: {name: 'Atul Vani'}, message: 'hey there'},
                {author: {name: 'Monica Vani'}, message: 'hiii!!!'},
                {author: {name: 'Atul Vani'}, message: 'how you doing'},
                {author: {name: 'Monica Vani'}, message: 'm gud, hru'},
                {author: {name: 'Monica Vani'}, message: 'busy!!!!!'},
                {author: {name: 'Atul Vani'}, message: 'kinda :('},
            ];
        }

        function postMesage () {
            vmHome.conversationList.push(vmHome.message);
        }
    }
})();
