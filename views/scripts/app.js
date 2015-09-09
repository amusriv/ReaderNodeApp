'use strict';

angular
    .module('readerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/Read.html',
                controller: 'ReadCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

