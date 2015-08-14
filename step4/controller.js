angular.module('app')
.controller('Step4Ctrl', function($scope, $timeout, $mdSidenav, $location) {
    $timeout(Prism.highlightAll);

    window.Q = function(id, name) {
        var self = this;
        this.name = name;
        this.id = id;
        this.startedAt = new Date().getTime();
        this.finishedAt = 0;
        this.seconds = 0;
        this.value = null;
        this.status = "pending";
        var _then, _reject;

        this.then = function (callback, reject) {
            _then = callback;
            _reject = reject;
        };

        this.resolve = function (value) {
            self.status= "resolved";
            self.value = value;
            this.finishedAt = new Date().getTime();
            this.seconds = this.finishedAt - this.startedAt;
            _then(value);

        };

        this.reject = function (error) {
            self.status = "rejected";
            this.finishedAt = new Date().getTime();
            this.seconds = this.finishedAt - this.startedAt;
            _reject(error);
        };
    };

    window.id = 0;
    window.promises = [];
    window.Promise = function(name) {
        var q = new Q(id++, name);
        promises.push(q);
        return q;
    };

    window.AsyncAction = function(name, action) {
        return function(){
            var args = Array.prototype.slice.call(arguments);
            var promise = window.Promise(name);
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
        $location.path('/step5');
    };

});







