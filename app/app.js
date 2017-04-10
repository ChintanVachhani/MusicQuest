'use strict';

// App level module
angular.module('musicQuestApp', [
    'ngRoute'
]).controller('displayViewController', function ($scope, $http) {
    $scope.tracksList = [];
    $scope.searchString = '';
    $scope.prevResults = '';
    $scope.nextResults = '';
    $scope.searchSuccessful = false;

    // Function to get track search results on clicking Search button
    $scope.searchSpotify = function () {
        $scope.requestURIString = "https://api.spotify.com/v1/search?q=" + $scope.searchString + "&type=track";
        $scope.makeGETRequest($scope.requestURIString);
    };

    // Function to get next tracks for the search results on clicking Next button
    $scope.getPreviousTracks = function () {
        $scope.makeGETRequest($scope.prevResults);
    };

    // Function to get previous tracks for the search results on clicking Previous button
    $scope.getNextTracks = function () {
        $scope.makeGETRequest($scope.nextResults);
    };

    // Main Function that makes GET request to the search on Spotify Web-API
    $scope.makeGETRequest = function (requestURI) {
        if (requestURI) {
            $scope.tracksList = [];
            $http.get(requestURI).success(function (res) {
                if (res.tracks.total > 0) {
                    $scope.prevResults = res.tracks.previous;
                    $scope.nextResults = res.tracks.next;
                    for (var i = 0; i < res.tracks.items.length; ++i) {
                        $scope.tracksList.push($scope.getNewTrack(res.tracks.items[i]));
                    }
                    $scope.searchSuccessful = true;
                } else {
                    $scope.searchSuccessful = false;
                }
            });
        }
    };

    // Function to create a new track object to be added to a row in the table
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


