(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('wsAPI', wsService);

    wsService.$inject = ['$http', '$q', '$rootScope', 'Event', 'ajaxErrorHandler', '$websocket'];
    /* @ngInject */

    function wsService ($http, $q, $rootScope, Event, ajaxError, $websocket) {
        var dataStream = $websocket ('ws://hacktag15.mybluemix.net/ws/button');
        var collection = [];
        dataStream.onMessage(function (message) {
            collection.push(JSON.parse(message.data));
            console.log(JSON.parse(message.data));
        });
        dataStream.onOpen(function () {
            console.log('open');
        });
        var methods = {
            collection: collection,
            get: function () {
                dataStream.send(JSON.stringify({action: 'get'}));
            }
        };

        return methods;
    }
})();
