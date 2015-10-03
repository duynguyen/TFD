(function () {
    'use strict';

    angular
        .module('app.timeline')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['wsAPI'];
    /* @ngInject */
    function TimelineController (wsAPI) {
        var vm = this;

        init();

        //////////////

        function init () {
        }
    }
})();
