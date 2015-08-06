
angular.module('promise', []).factory('Promise', function() {

  var id = 0;

  var promises = [];

  var Q = function (id, name) {
    this.id = id;
    this.name = name;
    this.status = 'pending';
    this.thenListeners = [];
    this.errorListeners = [];
    this.error = null;
    this.value = null;
    this.startedAt = new Date().getTime();
    this.finishedAt = 0;
    this.seconds = 0;
    this.then = function(callback, error) {

      var callbackPromise = {
        callback: callback,
        promise: Promise('Success for promise ' + this.id + ' (' + this.name + ')')
      };

      this.thenListeners.push(callbackPromise);

      if (error) {
        var errorPromise = {
          error: error,
          promise: Promise('Error for promise ' + this.id + ' (' + this.name + ')')
        };

        this.errorListeners.push(errorPromise);
      }

      return callbackPromise.promise;
    };
    this.resolve = function(arg) {
      this.status = 'resolved';
      this.value = arg;
      this.thenListeners.forEach(function(callbackPromise) {
        var value = callbackPromise.callback(arg);
        callbackPromise.promise.resolve(value);
      });
      this.finishedAt = new Date().getTime();
      this.seconds = this.finishedAt - this.startedAt;
    };
    this.reject = function(error) {
      this.status = 'rejected';
      this.errorListeners.forEach(function(errorPromise) {
        var value = errorPromise.callback(error);
        callbackPromise.promise.resolve(value);
      });
      this.finishedAt = new Date().getTime();
      this.seconds = this.finishedAt - this.startedAt;
    };
  };

  var Promise = function(name) {
    var q = new Q(id++, name);
    promises.push(q);
    return q;

  };

  Promise.all = function(promises) {
    var promise = Promise('Promise for ' + promises.length + ' promises');
    var array = [];
    var i = 0;
    promises.forEach(function(p) {

      p.then(function success(data) {
        i++;
        array.push(data);

        if (i == promises.length) {
          promise.resolve(array);
        }
      });

    });
    return promise;
  };

  Promise.stats = promises;

  return Promise;
});
