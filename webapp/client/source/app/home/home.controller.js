(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['wsAPI', '$state', '$timeout'];
    /* @ngInject */
    function HomeController (wsAPI, $state, $timeout) {
    }
})();
