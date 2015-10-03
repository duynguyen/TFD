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
        var connected = false,
            devicesArr = [],
            aliveArr = [],
            sbsArr = [],
            sidsArr = [],
            sensorArr = [];

        var methods = {
            isConnected: isConnected,
            getDevices: getDevices,
            getAlive: getAlive,
            getSBS: getSBS,
            getSIDS: getSIDS,
            getSensors: getSensors
        };

        init();

        return methods;

        function isConnected () {
            return connected;
        }

        function getDevices () {
            return devicesArr;
        }

        function getAlive () {
            return aliveArr;
        }

        function getSBS () {
            return sbsArr;
        }

        function getSIDS () {
            return sidsArr;
        }

        function getSensors () {
            return sensorArr;
        }

        function init () {
            connectWS();
        }

        function connectWS () {
            console.log('connecting to websocket...');
            var dataStream = $websocket ('ws://hacktag15.mybluemix.net/ws/baby');
            dataStream.onMessage(function (message) {
                var json = JSON.parse(message.data);
                if (json.raw) { // device data, sensor data
                    var device = {
                        id: json.raw.deviceId,
                        model: 'CC2650',
                        updated: json.timestamp
                    };
                    devicesArr = [device];
                    var sensor = json.raw.payload.d;
                    sensor.updated = json.timestamp;
                    sensorArr.push(sensor);
                } else if (json.alive) {
                    var alive = {
                        timestamp: json.timestamp,
                        alive: json.alive
                    };
                    aliveArr.push(alive);
                } else if (json.sbs) { // shoken
                    console.log(json.sbs);
                } else if (json.sids) { // sudden infant death
                    console.log(json.sids);
                }
            });
            dataStream.onOpen(function () {
                connected = true;
                console.log('open');
            });
            dataStream.onClose(function () {
                connected = false;
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
