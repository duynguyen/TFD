(function () {
    'use strict';

    angular
        .module('app.device')
        .controller('DeviceController', DeviceController);

    DeviceController.$inject = ['wsAPI'];
    /* @ngInject */
    function DeviceController (wsAPI) {
        var vm = this;

        init();

        //////////////

        function init () {
        }
    }
})();
