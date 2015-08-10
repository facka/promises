var app = angular.module('app', ['promise', 'ngMaterial', 'ngRoute', 'jseditor']);

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
  })
  .when('/step3', {
    templateUrl: 'step3/view.html',
    controller: 'Step3Ctrl'
  })
  .when('/step4', {
    templateUrl: 'step4/view.html',
    controller: 'Step4Ctrl'
  })
  .when('/step5', {
    templateUrl: 'step5/view.html',
    controller: 'Step5Ctrl'
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
      title: "Step3",
      path: "/step3"
    },
    {
      title: "Step4",
      path: "/step4"
    },
    {
      title: "Step5",
      path: "/step5"
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








