angular.module('app')
.controller('Step3Ctrl', function($scope, $timeout, $mdSidenav, $location) {
    $timeout(Prism.highlightAll);

    window.Q = function() {
        var self = this;
        this.status = "pending";
        var _then, _reject;
        this.then = function(callback, reject) {
            _then = callback;
            _reject = reject;
        };
        this.resolve = function(value) {
            self.status= "resolved";
            _then(value);
        };
        this.reject = function(error) {
            self.status = "rejected";
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

    $scope.next = function() {
        $location.path('/step4');
    };

});







