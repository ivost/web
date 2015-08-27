
angular.module('todo', ['ionic'])
.controller('MainCtrl', function($scope, $ionicScrollDelegate) {
  //console.log('MAIN CTRL');
  var v1 = $ionicScrollDelegate.$getByHandle('A1');
  var v2 = $ionicScrollDelegate.$getByHandle('A2');
  var x1 = 0;
  var x2 = 0;
  var px1 = 1;
  var px2 = 1;

  $scope.scrolledA1 = function() {
    //console.log(v1);
    x1 = v1.getScrollPosition().left;
    if (Math.abs(x1 - px1) >= 1) {
      px1 = x1;
      //console.log("A1 x1 " + x1);
      v2.scrollTo(x1, 0, 1);
    }
  };

  $scope.scrolledA2 = function() {
    x2 = v2.getScrollPosition().left;
    if (Math.abs(x2 - px2) >= 1) {
      //console.log("A2 x2 " + x2);
      px2 = x2;
      v1.scrollTo(x2, 0, 1);
    }

    // if (!f2) {
    //   console.log('scrolledA2');
    //   f2 = true;
    //   v1.scrollTo(v2.getScrollPosition());
    //   f2 = false;
    // }
    //console.log(v1.getScrollPosition());
    //v1.scrollTo(v2.getScrollPosition());
  };

});

/*
//console.log(v2.getScrollPosition());
// if (!f1) {
//   console.log('scrolledA1');
//   f1 = true;
//   v2.scrollTo(v1.getScrollPosition());
//   f1 = false;
// }

$scope.scrollA1 = function() {
  console.log('scrollA1');
  console.log(v1.getScrollPosition());
  console.log(v2.getScrollPosition());
};

$scope.scrollA2 = function() {
  console.log('scrollA2');
  console.log(v1.getScrollPosition());
  console.log(v2.getScrollPosition());
};

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
*/
/*
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
*/
    // // Create gradient
    // var grd = ctx.createRadialGradient(2500, 500, 200, 2500, 500, 3000);
    // grd.addColorStop(0,"red");
    // grd.addColorStop(1,"white");

    // Fill with gradient
    // ctx.fillStyle = grd;
    // ctx.fillRect(0, 0, 5000,100);
//   });
// })
