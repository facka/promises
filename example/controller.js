angular.module('app')
.controller('ExampleCtrl', function($scope, Promise, $timeout, $mdSidenav) {
    $timeout(Prism.highlightAll);

    var promisedDuplicateAsyncFunc = function(value) {

        var promise = Promise('Duplicate value ' + value);

        $timeout(function() {
            promise.resolve(value * 2);
        },2000);

        return promise;
    };


    var promisedFunc = function(params) {
        var promises = [];
        params.forEach(function(e) {
          var p = promisedDuplicateAsyncFunc(e).then(function(duplicated) {
            console.log('It was duplicated!!');
            return duplicated;
          });
          promises.push(p);
        });

        return Promise.all(promises);
    };


    /*  var p = promisedFunc([1]);

      p.then(function(result) {
        console.log('Result: ',result);
    });*/

    var d = promisedDuplicateAsyncFunc(2);

    d.then(function(value) {
        console.log("0: " + value);
        return value;
    });

    d.then(function(value) {
        console.log("1: " + value);
        return value;
    });

    d.then(function(value) {
        console.log("2: " + value);
        return value*2;
    }).then(function(value) {
        console.log("3: " + value);
        return value;
    });

});







