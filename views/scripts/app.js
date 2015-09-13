var app = angular.module('Read',["ngCookies"]);

app.controller('readCtrl',["$scope", "$cookies", "$http", "$templateCache", "$window", function($scope, $cookies, $http, $templateCache, $window) {
    $scope.link="/read";
    $scope.initCookie = function() {
        console.log("getting cookie");
        $scope.offset = 0;
        $scope.count = 0;

        $scope.offset=$cookies.get("Read.offset");

        if (typeof $scope.offset === 'undefined') {
            console.log("cookie not there. so putting");
            var now = new Date();
            now.setDate(now.getDate()+50);
            $scope.offset = Math.floor(Math.random() * 100) % 50; // 50 is number of records. Hard coded. ugly pushkar very ugly :( thu. ok, i'm very sleep deprived.
            $cookies.put("Read.offset", $scope.offset, {
                'expires': now,
            });
            $cookies.put("Read.count", $scope.count, {
                'expires': now,
            });
        }
        else {
            $scope.count = $cookies.get("Read.count");
        }
            
    };
    $scope.onClick = function() {
        console.log("onClick Reporting for duty");
        var data = null
        $http({
            method: 'GET',
            url: 'read?offset='+$scope.offset+'&count='+$scope.count,
            cache: $templateCache}).
            then(function(response) {
                console.log("blah");
                data = response.data;
                console.log(data);
                //open new tab
                $window.open(data);
                $scope.count = parseInt($scope.count) + 1;
                var now = new Date();
                now.setDate(now.getDate()+50);
                $cookies.put("Read.count", $scope.count, {
                    'expires': now,
                });
            }, function(response) {
                console.log("woops");
            });
        return data;
    }
    /*$scope.check = function() {
        console.log("thisischck");
    };*/
}]);

app.controller('watchCtrl', function($scope) {
    $scope.link="/watch";
});

app.controller('listenCtrl', function($scope) {
    $scope.link="/listen";
});
