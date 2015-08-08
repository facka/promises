angular.module('app')
.controller('Step2Ctrl', function($scope, Promise, $timeout, $mdSidenav) {
    $timeout(Prism.highlightAll);

    window.Q = function() {
        var _then, _reject;
        this.then = function(callback, reject) {
            _then = callback;
            _reject = reject;
        };
        this.resolve = function(value) {
            _then(value);
        };
        this.reject = function(error) {
            _reject(error);
        };
    };
    window.AsyncAction = function(action) {
        return function(){
            var args = Array.prototype.slice.call(arguments);
            var promise = new Q();
            setTimeout(function() {
                try {
                  var value = action.apply(this, args);
                  promise.resolve(value);
                }
                catch (e) {
                  promise.reject(e);
                }
            },1000);
            return promise;
        };
    };

    window.multiply = AsyncAction(function(arg, arg1) {
        throw "An error";
    });
});







