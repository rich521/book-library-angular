'use strict';

const bookUrl = 'https://rawgit.com/madwork/adfae25c174bb246c650/raw/db225e4b9c74e1865da1c9cd54cf87d3dee171a5/book.json';
angular.module('bookDirectoryApp')
    .service('bookFinder', function() {
        let _this = this;
        // Cache data, save ajax calling times
        _this.cache = [];
        // Call ajax request once, and cache data in bookfinder
        _this.getBooks = () => {
            if (_this.cache.length) return Promise.resolve(_this.cache);
            return axios.get(bookUrl)
                .then((response) => {
                    _this.cache = response.data;
                    return _this.cache;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    });
