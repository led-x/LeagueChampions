// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ChampApp = angular.module('ChampApp', ['ionic','ngRoute','ngSanitize']) //this is injecting the downloaded modules into the app

.run(function($ionicPlatform, $rootScope, $location) {


// global scope below
  $rootScope.goHome = function(){
    $location.path('/list');
//thisis a fcuntino when clicked will set the url to /list, basically a function for a home button
  };
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
//Setting up routes
//If you want to minimize your JS, you need to include that array or stuff will break
//Not 100% neccessary it's just best practice
ChampApp.config(['$routeProvider', function($routeProvider, $urlProvider){
  $routeProvider

    .when('/list',
    {
      controller: 'ListController',
      templateUrl: 'partials/list.html'
    })
  .when('/details/:itemId',
    {
      controller: 'DetailsController',
      templateUrl: 'partials/details.html'
    })
   .when('/skins/:itemId',
    {
      controller: 'SkinsController',
      templateUrl: 'partials/skins.html'
    })
  .otherwise({redirectTo: '/list'});
}]);
/////////LIST CONTROLLER //////////
ChampApp.controller('ListController',['$scope','$http', '$ionicLoading' ,function($scope,$http,$ionicLoading){
  $scope.loadChamp = function(){
    $ionicLoading.show();
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=tags,image&api_key=eb771b4e-dfa1-4e6f-a039-226552a84b6e")
    .success(function(response){
  // console.log(response);
    $scope.data = response.data;
    $scope.title = response.title;
    $scope.id = response.id;
    console.log(response.id);
    $scope.imageThumb = "http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/";
    $ionicLoading.hide();
    })

.finally(function(){
  $scope.$broadcast('scroll.refreshComplete');

});
};

  $scope.clearSearch = function() {
   $scope.search = '';
 };

  $scope.loadChamp();
}]);

//////DETAILS CONTROLLER //////////
ChampApp.controller('DetailsController',['$scope','$http', '$routeParams', '$ionicLoading' ,function($scope,$http, $routeParams, $ionicLoading)
{
  var url=  "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+$routeParams.itemId+"?champData=all&api_key=eb771b4e-dfa1-4e6f-a039-226552a84b6e";
  $ionicLoading.show();console.log(url);
  $http.get(url)
  
  .success(function(response){
    $scope.data = response;
    console.log(response);
    // $scope.name = response.data[$routeParams.itemId].name;
    // $scope.name = response[$routeParams.itemId].name;
    // $ionicLoading.hide();
    $scope.name = response.name;
    $ionicLoading.hide();
  });
}]);

ChampApp.controller('SkinsController',['$scope','$http', '$routeParams', '$ionicLoading' ,function($scope,$http, $routeParams, $ionicLoading)
{
  var url="https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+$routeParams.itemId+"?champData=skins&api_key=eb771b4e-dfa1-4e6f-a039-226552a84b6e"

  $ionicLoading.show();console.log(url);
  $http.get(url)
  
  .success(function(response){
    $scope.data = response;
    console.log(response);
    // $scope.name = response.data[$routeParams.itemId].name;
    // $scope.name = response[$routeParams.itemId].name;
    // $ionicLoading.hide();
    $scope.name = response.name;
    $ionicLoading.hide();
  });
}]);










