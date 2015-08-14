angular.module('app')
.controller('Step1Ctrl', function($scope, $timeout, $mdSidenav, $location) {
    $timeout(Prism.highlightAll);

    window.Q = function() {
        var _then;
        this.then = function (callback) {
            _then = callback;
        };
        this.resolve = function (value) {
            _then(value);
        };
    };
    window.AsyncAction = function (action) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var promise = new Q();
            setTimeout(function() {
                var value = action.apply(this, args);
                promise.resolve(value);
            },1000);
            return promise;
        };
    };

    $scope.next = function() {
        $location.path('/step2');
    };

});







