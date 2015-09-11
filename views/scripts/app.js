var app = angular.module('Read2',[]);

app.controller('readCtrl', function($scope) {
    $scope.link="/read";
    app.go() = function() {
        $http({
            url: $scope.link,
            method: "GET",
            params: {offset: $scope.offset, count: $scope.count},
        }).success(funtion(response) {$scope.target = response
});

app.controller('watchCtrl', function($scope) {
    $scope.link="/watch";
})

app.controller('listenCtrl', function($scope) {
    $scope.link="/listen";
})
