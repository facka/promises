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
  })
  .when('/step6', {
    templateUrl: 'step6/view.html',
    controller: 'Step6Ctrl'
  })
  .when('/appendix', {
    templateUrl: 'appendix/view.html',
    controller: 'AppendixCtrl'
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
      title: "Step 1",
      path: "/step1"
    },
    {
      title: "Step 2",
      path: "/step2"
    },
    {
      title: "Step 3",
      path: "/step3"
    },
    {
      title: "Step 4",
      path: "/step4"
    },
    {
      title: "Step 5",
      path: "/step5"
    },
    {
      title: "Step 6",
      path: "/step6"
    },
    {
      title: "Appendix",
      path: "/appendix"
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








