(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope', 'Event'];
    /* @ngInject */
    function HeaderController ($rootScope, Event) {
        var vm = this;

        vm.switchSidebar = switchSidebar;

        function switchSidebar () {
            $rootScope.showSidebar = !$rootScope.showSidebar;
        }
    }
})();
