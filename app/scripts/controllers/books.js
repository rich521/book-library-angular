'use strict';

// Book/Main controller
angular.module('bookDirectoryApp')
    .controller('BooksCtrl', function($scope, bookFinder) {
        // Use 'this' to control the scope
        const _this = this;

        // List scope date variables
        _this.currentPage = 0;
        _this.pageSize = 9;
        _this.pageination = [];
        _this.categories = [];
        _this.genres = [];
        _this.selectType = '';
        _this.search = '';
        _this.items = [];
        _this.arrayData = [];

        // Fetch books
        bookFinder.getBooks().then(
            (data) => {
                _this.items = data;
                // Get all genres and categories
                for (let i = data.length - 1; i >= 0; i--) {
                    let dig = data[i].genre;
                    if (_this.categories.indexOf(dig.category) === -1) _this.categories.push(dig.category);
                    if (_this.genres.indexOf(dig.name) === -1) _this.genres.push(dig.name);
                }
                _this.genres.sort();
                $scope.$digest();
            }
        );

        // Custom filter
        _this.getData = () => {
            _this.arrayData.length = 0;
            let refArray = [],
                word = _this.search.toLowerCase(),
                select = _this.selectType;

            if (select !== '') {
                for (let i = 0; i < _this.items.length; i++) {
                    let dig = _this.items[i].genre;
                    if (dig.category.indexOf(select) > -1 || dig.name.indexOf(select) > -1) {
                        refArray.push(_this.items[i]);
                    }
                }
            } else {
                refArray = _this.items.slice();
            }

            if (word === '') {
                _this.arrayData = refArray.slice();
            } else {
                for (let i = 0; i < refArray.length; i++) {
                    if (refArray[i].name.toLowerCase().indexOf(word) > -1 || refArray[i].author.name.toLowerCase().indexOf(word) > -1) {
                        _this.arrayData.push(_this.items[i]);
                    }
                }
            }
            return _this.arrayData;
        };

        // Get the number of pages for pagination
        _this.numberOfPages = () => {
            // Get the number of pages for every 9 books
            let len = Math.ceil(_this.getData().length / _this.pageSize);
            return new Array(len);
        };

        // Pagination class active or not
        _this.checkIndex = (index) => {
            return index === _this.currentPage ? 'active' : '';
        };

        // Change page function
        _this.next = () => {
            _this.currentPage = _this.arrayData.length / _this.pageSize - 1 > _this.currentPage ? _this.currentPage + 1 : _this.currentPage
        };

        _this.prev = () => {
            _this.currentPage = _this.currentPage > 0 ? _this.currentPage - 1 : _this.currentPage
        };

        // Change selection type
        _this.changeType = (type) => {
            _this.selectType = type;
        };

        // Reset to default pageination
        _this.change = () => {
            _this.currentPage = 0;
        };

        // Time
        _this.relativeTime = (ref) => {
            // Make a refTime time
            let delta = Math.round((new Date() - new Date(ref)) / 1000),
                day = 86400,
                week = day * 7,
                month = day * 30.5,
                year = day * 365;

            let refTime;

            switch (delta) {
                case (delta < week):
                    refTime = Math.floor(delta / day) + ' days ago';
                    break;
                case (delta < month):
                    refTime = Math.floor(delta / week) + ' weeks ago';
                    break;
                case (delta < year):
                    refTime = Math.floor(delta / month) + ' months ago';
                    break;
                default:
                    refTime = Math.floor(delta / year) + ' years ago';
                    break;
            }
            return refTime;
        };

        // Filters books for each page
    }).filter('startFrom', () => {
        return (input, start) => {
            if (!input || !input.length) return;
            start = +start;
            return input.slice(start);
        }
    });
