(function () {
    'use strict';

    angular
        .module('app.device')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.device',
                config: {
                    url: '/device',
                    views: {
                        'main@': {
                            templateUrl: 'static/device/device.html',
                            controller: 'DeviceController as vm'
                        }
                    },
                    data: {
                        title: 'Devices',
                        _class: 'device'
                    },
                    sidebar: {
                        icon: 'mdi-tablet-ipad',
                        text: 'Devices'
                    },
                    breadcrumb: 'Devices'
                }
            }
        ];
    }
})();
