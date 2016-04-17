angular.module('app.services', [])
  .factory('PlayerState', function ($rootScope) {
    'use strict';
   	var data = {};
    return {
        get: function () {
            //console.log('GET ' + JSON.stringify(data));
            return data;
        },
        set: function (newData) {
            data = newData;
            //console.log('SET ' + JSON.stringify(data));
        },
        reset: function () {
            data = {};
        }
    };
  })

.factory('Res', function(Const) {
    //console.log('Res factory');
    return {
        REST_URL: 'http://' + Const.HOST + ':' + Const.PORT + '/api/v1', 
        WS_URL: 'ws://' + Const.HOST + ':' + Const.PORT + '/api/v1', 
        ALBUMS: '/medialibrary/albums',
        ARTISTS: '/medialibrary/artists',
        GENRES: '/medialibrary/genres',
        SOURCES: '/medialibrary/sources',
        TRACKS: '/medialibrary/tracks',
        QUEUE: '/media/collections',
        PLAYERS: '/media/renderers',
        AUDIO_SOURCES: '/mixer/audiosources'
    }
})

.factory('Events', function($websocket, Res) {
  console.log('*** Events factory - WS URI: ' + Res.WS_URL);
  var ws = $websocket(Res.WS_URL);
  // callbacks - hash with key = resource
  ws.callbacks = {};
  // queue websocket requests - don't send before 
  // connection is open
  var sendQueue = [];
  var isOpen = false;

  function wsSend(message) {
      if (isOpen) {
        console.log('Sending ' + message);
        ws.send(message);
      } else {
        sendQueue.push(message);
      }
    };

  ws.onMessage(function(event) {
    console.log('onMessage: ', event.data);
    res = JSON.parse(event.data);
    if (res.type === 'data') {
        // lookup path/resource for callbacks
        if (ws.callbacks[res.event]) {
            console.log('callback with ', res.data);
            ws.callbacks[res.event](res.data);
        }
    }
  });

  ws.onError(function(event) {
    console.log('*** connection Error', event);
    isOpen = false;
  });

  ws.onClose(function(event) {
    //console.log('connection closed', event);
    isOpen = false;
  });

  ws.onOpen(function() {
    //console.log('connection open');
    isOpen = true;
    // drain the queue, send with small delay
    sendQueue.forEach(function(message){
      setTimeout(function() { 
          console.log('delayed send: ' + message);
          ws.send(message); 
      }, 20);
    });
    sendQueue = [];
  });

  return {
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) {
        wsSend(message);
      }
      else {
        wsSend(JSON.stringify(message));
      }
    },
    subscribe: function(resource, callback) {
        // map of callbacks - key is resource / path
        ws.callbacks[resource] = callback;
        console.log('subscribe ' + resource);
        wsSend(JSON.stringify({"type":"subscribe", "event": resource}));
    }
}});
