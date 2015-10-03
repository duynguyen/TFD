(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'wsAPI'];
    /* @ngInject */
    function DashboardController ($scope, wsAPI) {
        var vm = this;

        vm.messages = wsAPI.getSIDS();

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
