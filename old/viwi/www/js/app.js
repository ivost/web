angular.module('app',['ui.router','restangular', 'ngWebSocket', 'app.controllers', 'app.services'])
/*
 *  Configure HOST below for simulation (localhost) or target (10.0.1.40) as needed
 */
.constant("Const", {
        //HOST: 'localhost',
        HOST: '10.0.1.40',
        PORT: 3232
})
.config(function($stateProvider, RestangularProvider, Const){
    $stateProvider
    .state('sources',{
        url:'/sources',
        templateUrl:'partials/sources.html',
        controller:'SourceListCtrl'
    })
    .state('source',{
       url:'/sources/:id',
       templateUrl:'partials/source.html',
       controller:'SourceViewCtrl'
    })
    .state('tracks',{
        url:'/tracks',
        templateUrl:'partials/tracks.html',
        controller:'TrackListCtrl'
    })
    .state('track',{
       url:'/tracks/:id',
       templateUrl:'partials/track.html',
       controller:'TrackViewCtrl'
    })
    .state('track-search',{
       url:'/track-search/:text',
       templateUrl:'partials/track-search.html',
       controller:'TrackSearchCtrl'
    })
    .state('queue',{
       url:'/queue/:id',
       templateUrl:'partials/collections.html',
       controller:'QueueCtrl'
    })
    .state('albums',{
        url:'/albums',
        templateUrl:'partials/albums.html',
        controller:'AlbumListCtrl'
    })
    .state('album',{
       url:'/albums/:id',
       templateUrl:'partials/album.html',
       controller:'AlbumViewCtrl'
    })
    .state('collections',{
        url:'/collections',
        templateUrl:'partials/collections.html',
        controller:'MediaCollectionListCtrl'
    })
    .state('collection',{
        url:'/collection/:id',
        templateUrl:'partials/collection.html',
        controller:'MediaCollectionViewCtrl'
    })
    .state('removed',{
        url:'/removed',
        templateUrl:'partials/collections.html',
        controller:'MediaCollectionDummyCtrl'
    })
    .state('players',{
        url:'/players',
        templateUrl:'partials/players.html',
        controller:'PlayerListCtrl'
    })
    .state('player',{
        url:'/player/:id',
        templateUrl:'partials/player.html',
        controller:'PlayerViewCtrl'
    })
    .state('player-edit',{
        url:'/player-edit/:id',
        templateUrl:'partials/player-edit.html',
        controller:'PlayerEditCtrl'
    })
    .state('audio-sources',{
        url:'/audio-sources',
        templateUrl:'partials/audio-sources.html',
        controller:'MixerViewCtrl'
    })
    .state('vol-change',{
        url:'/vol-change/:id',
        templateUrl:'partials/vol-change.html',
        controller:'VolChangeCtrl'
    })
    ;

    var base = 'http://' + Const.HOST + ':' + Const.PORT + '/api/v1/';
    console.log('setBaseUrl ' + base);
    RestangularProvider.setBaseUrl(base);
}).run(function($state){
   $state.go('sources');
});

