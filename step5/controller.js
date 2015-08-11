angular.module('app')
.controller('Step5Ctrl', function($scope, Promise, $timeout, $mdSidenav) {
    $timeout(Prism.highlightAll);


    window.Q = function(id, name) {
        var self = this;
        this.name = name;
        this.id = id;
        this.startedAt = new Date().getTime();;
        this.finishedAt = 0;
        this.seconds = 0;
        this.value = null;
        this.status = "pending";
        this.callback = null;
        this.thenListeners = [];
        this.errorListeners = [];

        this.then = function (callback, reject) {

            var callbackPromise = Promise('Success for promise ' + this.id + ' (' + this.name + ')');

            callbackPromise.callback = callback;
            this.thenListeners.push(callbackPromise);

            if (reject) {
                var errorPromise = Promise('Error for promise ' + this.id + ' (' + this.name + ')');

                errorPromise.callback = reject;
                this.errorListeners.push(errorPromise);
            }
        };

        this.resolve = function (value) {
            self.status= "resolved";
            self.value = value;

            this.thenListeners.forEach(function (callbackPromise) {
              var value = callbackPromise.callback(arg);
              callbackPromise.resolve(value);
            });

            this.finishedAt = new Date().getTime();
            this.seconds = this.finishedAt - this.startedAt;
            _then(value);

        };

        this.reject = function (error) {
            self.status = "rejected";

            this.errorListeners.forEach(function(errorPromise) {
              var value = errorPromise.callback(error);
              callbackPromise.resolve(value);
            });

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
            var promise = new Promise(name);
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

      window.multiply = AsyncAction('Multiply', function(arg, arg1) {
        return arg * arg1;
      });
});







