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
            sidsArr = [],
            shokenArr = [],
            sensorArr = [],
            climbArr = [],
            fallingArr = [],
            sunburnArr = [],
            feverArr = [];

        var methods = {
            isConnected: isConnected,
            getDevices: getDevices,
            getAlive: getAlive,
            getSIDS: getSIDS,
            getSensors: getSensors,
            getShoken: getShoken,
            getClimb: getClimb,
            getFalling: getFalling,
            getSunburn: getSunburn,
            getFever: getFever
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

        function getShoken () {
            return getShoken;
        }

        function getSIDS () {
            return sidsArr;
        }

        function getSensors () {
            return sensorArr;
        }

        function getClimb () {
            return climbArr;
        }

        function getFalling () {
            return fallingArr;
        }

        function getFever () {
            return feverArr;
        }

        function getSunburn () {
            return sunburnArr;
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
                } else if (json.sids) { // sudden infant death
                    var sids = json.sids;
                    sids.timestamp = json.timestamp;
                    sidsArr.push(sids);
                } else if (json.sbs) { // shoken
                    shokenArr.push({
                        timestamp: json.timestamp,
                        shoken: json.sbs.shaken
                    });
                } else if (json.climbing) {
                    climbArr.push({
                        timestamp: json.timestamp,
                        climbing: json.climbing.climbing
                    });
                } else if (json.fall) {
                    fallingArr.push({
                        timestamp: json.timestamp,
                        falling: json.fall.fall
                    });
                } else if (json.fever) {
                    feverArr.push({
                        timestamp: json.timestamp,
                        fever: json.fever.fever
                    });
                } else if (json.sunburn) {
                    sunburnArr.push({
                        timestamp: json.timestamp,
                        sunburn: json.sunburn.sunburn
                    });
                } else {
                    console.log(json);
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
