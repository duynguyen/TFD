(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'wsAPI'];
    /* @ngInject */
    function DashboardController ($scope, wsAPI) {
        var vm = this;

        $scope.$watch('wsAPI.sids', function (newValue, oldValue) {
            console.log(newValue);
            if (oldValue !== newValue) {
                vm.messages = newValue;
            }
        });

        vm.messages = wsAPI.sids;

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
