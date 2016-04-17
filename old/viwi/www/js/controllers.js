     angular.module('app.controllers', [])
     // list of sources
     .controller('SourceListCtrl',
      function($scope, Restangular, Events, Res) {
        // for testing multiple subscriptions
        // Events.subscribe(Res.TRACKS, function(data) {
        //   console.log("Received notification from tracks");
        // });

        // Events.subscribe(Res.ALBUMS, function(data) {
        //   console.log("Received notification from albums");
        // });

        Events.subscribe(Res.SOURCES, function(data) {
          console.log("Received notification from sources");
          console.log(data);
          $scope.sources = data;
          $scope.$apply();
        });

        Events.subscribe(Res.QUEUE, function(data) {
          console.log("Received notification from queue");
        });

        // Events.subscribe(Res.ARTISTS, function(data) {
        //   console.log("Received notification from artists");
        // });
        // GET REQUEST for sources
        Restangular.one(Res.SOURCES).get()
         .get('data').then(function (data) {
           $scope.sources = data;
         });
      })
     // source
     .controller('SourceViewCtrl',
      function($scope, $stateParams, Restangular, Events, Res) {
        var id = $stateParams.id;

        Events.subscribe(Res.SOURCES + "/" + id, function(data) {
          $scope.source = (data.length > 0) ? data[0] : {};
          $scope.$apply();
        });

        Restangular.one(Res.SOURCES, id).get()
        .get('data').then(function (data) {
          $scope.source = data;
        });
      })
     // list of tracks
     .controller('TrackListCtrl',
      function($scope, Restangular, Events, Res) {
        Events.subscribe(Res.TRACKS, function(data) {
          $scope.tracks = data;
          $scope.$apply();
        });
        Restangular.one(Res.TRACKS).get()
        .get('data').then(function (data) {
          $scope.tracks = data;
        });
      })
     // single track
     .controller('TrackViewCtrl',
      function($scope, $stateParams, Restangular, Events, Res) {
        var id = $stateParams.id;
        Events.subscribe(Res.TRACKS + "/" + id, function(data) {
          $scope.track = (data.length > 0) ? data[0] : {};
          $scope.$apply();
        });
        Restangular.one(Res.TRACKS, id).get()
        .get('data').then(function (data) {
          $scope.track = data;
        });
      })
     // search tracks
     .controller('TrackSearchCtrl',
      function($scope, Restangular, Events, Res) {
        $scope.search = function(q) {
          //console.log('track search: ' + q);
          var url = Res.TRACKS + '?q=' + encodeURIComponent(q);
          Restangular.one(url).get()
            .get('data').then(function (data) {
                //console.log(data);
                $scope.tracks = data;
          });
        }
      })
     // list of albums
     .controller('AlbumListCtrl',
      function($scope, Restangular, Events, Res) {
        Events.subscribe(Res.ALBUMS, function(data) {
          $scope.albums = data;
          $scope.$apply();
        });
        Restangular.one(Res.ALBUMS).get()
        .get('data').then(function (data) {
          $scope.albums = data;
        });
      })
     .controller('AlbumViewCtrl',
      function($scope, $stateParams, Restangular, Events, Res) {
        var id = $stateParams.id;
        Events.subscribe(Res.ALBUMS + "/" + id, function(data) {
          $scope.album = (data.length > 0) ? data[0] : {};
          $scope.$apply();
        });
        Restangular.one(Res.ALBUMS, id).get()
        .get('data').then(function (data) {
          $scope.album = data;
        });
      })

     .controller('PlayerListCtrl',
      function($scope, Restangular, Events, Res) {
       Restangular.one(Res.PLAYERS).get()
       .get('data').then(function (data) {
        $scope.players = data;
      });
     })
     // player view
     .controller('PlayerViewCtrl',
      function($scope, $state, $stateParams, Restangular, Events, Res, PlayerState) {
        var id = $stateParams.id;
        Events.subscribe(Res.PLAYERS + "/" + id, function(data) {
              //console.log(data);
              $scope.player = data;
              var media = $scope.player.media;
              if (media && media.items && media.items.length > 0) {
                var track = media.items[0];
                $scope.player.title = track.name;
                $scope.player.duration = 1000 * track.duration;
                // refresh
                $scope.$apply();
                }
              });
        Restangular.one(Res.PLAYERS, id).get()
        .get('data').then(function (data) {
          //console.log(data);
          $scope.player = data;
          $scope.player.duration = 0;
          var media = $scope.player.media;
          if (media && media.items && media.items.length > 0) {
            var track = media.items[0];
            $scope.player.title = track.name;
            //console.log($scope.player.title);
            $scope.player.duration = 1000 * track.duration;
            }
            PlayerState.set(data);
          });
      })
     // player change
     .controller('PlayerEditCtrl',
      function($scope, $state, $stateParams, Restangular, Events, Res, PlayerState) {
          //todo: move to Res
          $scope.states = [{"id":"idle", "name":"Idle"}, {"id":"play", "name":"Play"}, {"id":"pause", "name":"Pause"}, 
            {"id":"stop", "name":"Stop"}, {"id":"ff", "name":"Fast Forward"}, {"id":"fr", "name":"Fast Rewind"},
            {"id":"nextTrack", "name":"Next Track"}, {"id":"prevTrack", "name":"Previous Track"}];
          // flags to control which attributes to send
          $scope.send = {
            state: true,
            repeat: false,
            scan: false,
            shuffle: false,
            mediaindex: false,
            offset: false,
            speed: false
          };

          Restangular.one(Res.PLAYERS, $stateParams.id).get()
          .get('data').then(function (data) {
            $scope.player = data;
            PlayerState.set($scope.player);
                // set current state of the drop-down
                for (var i=0; i<$scope.states.length; i++) {
                  if ($scope.states[i].id === $scope.player.state) {
                    $scope.selectedState = $scope.states[i];
                    break;
                  }
                }
              });

          $scope.updateState = function(id) {
            $scope.player.state = $scope.selectedState.id;
            var flags = $scope.send;
            console.log(flags);
            var obj = {};
            var pl = $scope.player;
              // post only checked attributes
              for (attr in flags) {
                if ( flags.hasOwnProperty(attr) &&
                 flags[attr]) {
                 obj[attr] = pl[attr];
             }
           }
           console.log(obj);
           PlayerState.set($scope.player);
           Restangular.all(Res.PLAYERS + '/' + id)
           .post(obj).then(function(result){
            $state.go('players');
          });
         };

       })

     .controller('MediaCollectionDummyCtrl',
      function($scope, $state) {
        $state.go('collections');
      })
     // remove from queue
     .controller('MediaCollectionListCtrl',
      function($scope, Restangular, $http, $state, Events, Res, Const) {

        Events.subscribe(Res.QUEUE, function(data) {
          if (data) {
            console.log("QUEUE CHANGE " + JSON.stringify(data));
            $scope.collections = data;
            $scope.$apply();
          }
        });

        Restangular.all(Res.QUEUE).getList()
        .then(function (data) {
            //console.log(data);
            $scope.collections = data;
          });
        $scope.removeCollection=function(obj){
            //console.log("removeCollection " + obj.id);
            // having problems with response after Restangular.delete - using $http as workaround
            //var url = "http://localhost:3232/api/v1";
            var url = 'http://' + Const.HOST + ':' + Const.PORT + '/api/v1/' + Res.QUEUE + '/' + obj.id;
            console.log("delete url " + url);
            $http.delete(url)
            .success(function(data, status, headers, config) {
                //console.log('SUCC');
                // need dummy state in order to refresh the list
                $state.go('removed');
              })
            .error(function(data, status, headers, config) {
              console.log('ERROR ' + status);
            });
          };
        })
     // /media/collections
     .controller('MediaCollectionViewCtrl',
      function($scope,$stateParams, Restangular, Events, Res) {

       Restangular.one(Res.QUEUE, $stateParams.id).get()
       .get('items').then(function (items) {
        $scope.collection = items[0];
      });
     })
     // add to queue
     .controller('QueueCtrl',
      function($scope, $state, $stateParams, Restangular, Events, Res) {
        //console.log("Queue track " + $stateParams.id);
        Events.subscribe(Res.QUEUE, function(data) {
          if (data) {
            console.log("QUEUE CHANGE " + JSON.stringify(data));
          }
        });

        Restangular.one(Res.TRACKS, $stateParams.id).get()
        .get('data').then(function (data) {
            //$scope.track = data;
            // remove nested objects from the track 
            delete data.albums;
            delete data.artists;
            delete data.genres;
            delete data.source;
            var collection = {};
            collection.items = [ data ];
            collection.name = ''; // no name
            var collections = Restangular.all(Res.QUEUE);
            console.log("ADD TO QUEUE");
            collections.post(collection).then(function(result) {
              // comment next line  to test notifications (stay on same page)  
              $state.go('collections')
            });
          });
      })
     // list of audio sources (single)
     .controller('MixerViewCtrl',
      function($scope,$stateParams, Restangular, Events, Res) {
       Restangular.all(Res.AUDIO_SOURCES).getList()
       .then(function (data) {
        $scope.sources = data;
      });
     })
     // volume change
     .controller('VolChangeCtrl',
      function($scope, $state, $stateParams, $http, Events, Res, Const) {
        var id = $stateParams.id;
        var url = 'http://' + Const.HOST + ':' + Const.PORT + '/api/v1/' + Res.AUDIO_SOURCES + '/' + id;
          //console.log('get audio source ' + url);
          $http.get(url)
          .success(function(data, status, headers, config) {
                    //console.log(data);
                    data.volumeChange = 0;
                    $scope.source = data;
                  })
          .error(function(data, status, headers, config) {
            console.log('ERROR ' + status);
          });

          $scope.changeVol = function(value) {
            console.log('changeVol ' + value);
            var vol = {volumeChange: parseInt(value)};
            $http.post(url, vol);
          };

          $scope.mute = function(value) {
            console.log('mute ' + value);
            var val = {mute: value ? 1 : 0};
            $http.post(url, val);
          };
        })

     ;
