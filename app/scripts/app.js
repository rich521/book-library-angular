'use strict';

angular
    .module('bookDirectoryApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/books.html',
                controller: 'BooksCtrl as book'
            })
            .state('item', {
                url: '/books/item/:id',
                templateUrl: 'views/item.html',
                controller: 'ItemCtrl as item'
            });
    });
