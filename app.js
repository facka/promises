var app = angular.module('app', ['promise', 'ngMaterial', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'home/view.html',
    controller: 'HomeCtrl'
  })
  .when('/example', {
    templateUrl: 'example/view.html',
    controller: 'ExampleCtrl'
  })
  .when('/step1', {
    templateUrl: 'step1/view.html',
    controller: 'Step1Ctrl'
  })
  .when('/step2', {
    templateUrl: 'step2/view.html',
    controller: 'Step2Ctrl'
  });

});

app.controller('MainCtrl', function($scope, Promise, $timeout, $mdSidenav, $location) {
  $scope.promises = Promise.stats;

  $scope.closeSidebar = function () {
    $mdSidenav('left').close();

  };
  $scope.openSidebar = function () {
    $mdSidenav('left').open();
  };

  $scope.sections = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Step1",
      path: "/step1"
    },
    {
      title: "Step2",
      path: "/step2"
    },
    {
      title: "Example",
      path: "/example"
    }

  ];

  $scope.selected = $scope.sections[0];

  $scope.select = function(section) {
    $scope.selected = section;
    $location.path(section.path);
    $scope.closeSidebar();
  };


});








