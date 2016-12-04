'use strict';

angular.module('bookDirectoryApp')
    .controller('ItemCtrl', function($stateParams, $scope, bookFinder) {
        let _this = this;
        // Book selected to see
        _this.book = [];
        // Recommended books
        _this.recBooks = [];
        // Fetch books
        bookFinder.getBooks().then(
            (data) => {
                // Store Independent variable from data
                let ref = data.slice();
                // Find Selected Book
                for (let i = data.length - 1; i >= 0; i--) {
                    let di = data[i];
                    if (di.id === $stateParams.id) {
                        _this.book = di;
                        ref.splice(i, 1);
                        break;
                    }
                }

                // Reference
                let bookCat = _this.book.genre.category,
                    bookNm = _this.book.genre.name,
                    counter = 0;
                // Find Recommeneded books
                for (let i = ref.length - 1; i >= 0; i--) {
                    let refi = ref[i].genre;
                    if (refi.category === bookCat && refi.name === bookNm) {
                        _this.recBooks.push(ref[i]);
                        counter++;
                        if (counter > 2) break;
                    }
                }
                $scope.$digest();
            }
        );
    });
