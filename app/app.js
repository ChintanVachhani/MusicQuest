'use strict';

// Declare app level module which depends on views, and components
angular.module('musicQuestApp', [
    'ngRoute'
]).controller('displayViewController', function ($scope, $http) {
    $scope.tracksList = [];
    $scope.searchString = '';
    $scope.searchComplete = true;
    $scope.searchSpotify = function () {
        $scope.tracksList = [];
        $scope.requestURIString = "https://api.spotify.com/v1/search?q=" + $scope.searchString + "&type=track";
        $http.get($scope.requestURIString).success(function (res) {
            for (var i = 0; i < res.tracks.items.length; ++i) {
                $scope.tracksList.push($scope.getNewTrack(res.tracks.items[i]));
            }
            $scope.searchComplete = false;
        });
    };

    $scope.getNewTrack = function (obj) {
        var newTrack = {id: '', name: '', albumName: '', duration: '', popularity: ''};
        newTrack.id = obj.id;
        newTrack.name = obj.name;
        newTrack.albumName = obj.album.name;
        newTrack.duration = obj.duration_ms / 1000;
        newTrack.popularity = obj.popularity;
        return newTrack;
    };
});


