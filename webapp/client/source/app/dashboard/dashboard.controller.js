(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['wsAPI'];
    /* @ngInject */
    function DashboardController (wsAPI) {
        var vm = this;

        vm.messages = wsAPI.collection;

        vm.colors = [
            'bgc-indigo-500',
            'bgc-red-500',
            'bgc-pink-500'
        ];

        init();

        //////////////

        function init () {
        }
    }
})();
