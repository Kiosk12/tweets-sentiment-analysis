"use strict";

define(['require',
        'angular'], function(require) {
  var angular = require('angular');

  return angular
  .module('trackBar', [
          'angular-websocket'
  ])
  .directive('trackBar', [function () {
    return {
      replace: true,
      scope: {
        'keywords': '=',
        'tracks': '='
      },
      controller: function($scope, WebSocket){
        $scope.newKeyWord = ''
        $scope.track = function (event) {
          if ($scope.newKeyWord.length > 0 && (! _.contains($scope.keywords, $scope.newKeyWord)) ) {
            $scope.keywords.push($scope.newKeyWord)
            $scope.tracks.push(
              {
                'keyword': $scope.newKeyWord,
                analysis: {}
              })
            WebSocket.send(JSON.stringify({track: $scope.newKeyWord}));
          }
        }
      },
      restrict: 'E', 
      templateUrl: 'assets/js/track-bar/track-bar.html'
    };
  }
  ]);

});
