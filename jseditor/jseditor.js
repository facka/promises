angular.module('jseditor', [])
.run(function($rootScope, $timeout) {


    var log = console.log;

    console.log = function() {
      var msgs = [];
      while(arguments.length) {
          msgs.push([].shift.call(arguments));
      }

      $timeout(function() {
        $rootScope.$emit('log', msgs.toString());
      });

      log.apply(console, msgs);
    };

})
.directive('jsEditor', function() {
  return {
        restrict: 'E',
        scope: {},
        templateUrl: "jseditor/jseditor.html",
        transclude: true,
        controller: function($scope, $rootScope, $timeout) {
            var editor;
            $timeout(function() {
              editor = ace.edit("editor");
              editor.setTheme("ace/theme/monokai");
              editor.getSession().setMode("ace/mode/javascript");
              editor.resize();
            });

            $rootScope.$on('log', function($event, message) {
              $scope.console = message;
            });

            $scope.run = function() {
              var code = editor.getValue();
              try {
                $scope.console = eval(code);
              }
              catch (e) {
                $scope.console = e;
              }
            };

        }
    };
});
