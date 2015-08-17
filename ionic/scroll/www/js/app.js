// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var canvas = document.getElementById("c1");
    var img = document.getElementById("p1");
    var context = canvas.getContext("2d");

    var pattern = context.createPattern(img, 'repeat');
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();

    var canvas2 = document.getElementById("c2");
    var context2 = canvas2.getContext("2d");

    var pattern2 = context2.createPattern(img, 'repeat');
    context2.rect(0, 0, canvas2.width, canvas2.height);
    context2.fillStyle = pattern2;
    context2.fill();

    // // Create gradient
    // var grd = ctx.createRadialGradient(2500, 500, 200, 2500, 500, 3000);
    // grd.addColorStop(0,"red");
    // grd.addColorStop(1,"white");

    // Fill with gradient
    // ctx.fillStyle = grd;
    // ctx.fillRect(0, 0, 5000,100);

  });
})
