(function () {
    'use strict';

    angular
        .module('app.timeline')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.timeline',
                config: {
                    url: '/timeline',
                    views: {
                        'main@': {
                            templateUrl: 'static/timeline/timeline.html',
                            controller: 'TimelineController as vm'
                        }
                    },
                    data: {
                        title: 'Timeline',
                        _class: 'timeline'
                    },
                    sidebar: {
                        icon: 'mdi-chart-line',
                        text: 'Timeline'
                    },
                    breadcrumb: 'Timeline'
                }
            }
        ];
    }
})();
