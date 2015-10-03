(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('wsAPI', wsService);

    wsService.$inject = [
        '$http', '$q',
        '$timeout', '$rootScope', 'Event',
        'ajaxErrorHandler', '$websocket'
    ];
    /* @ngInject */

    function wsService ($http, $q, $timeout, $rootScope, Event, ajaxError, $websocket) {
        var collection = [];
        var connected = false;

        var methods = {
            collection: collection,
            connected: connected
        };

        init();

        return methods;

        function init () {
            connectWS();
        }

        function connectWS () {
            console.log('connecting to websocket...');
            var dataStream = $websocket ('ws://hacktag15.mybluemix.net/ws/baby');
            dataStream.onMessage(function (message) {
                console.log(JSON.parse(message.data));
                collection.push(JSON.parse(message.data));
            });
            dataStream.onOpen(function () {
                connected = true;
                collection.push('open');
                console.log('open');
            });
            dataStream.onClose(function () {
                connected = false;
                collection.push('closed');
                console.log('closed');
                reconnectWS();
            });
        }

        function reconnectWS () {
            $timeout (function () {
                if (connected) {
                    return;
                }
                connectWS();
            }, 500);
        }
    }
})();
