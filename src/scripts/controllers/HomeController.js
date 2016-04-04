
var Papa = require('papa-parse');

'use strict';

module.exports = ['$scope', '$timeout', '$filter', function($scope, $timeout, $filter) {

    $scope.dropped = false;
    $scope.data = null;

    $scope.categories = {
        food: ['marks and', 'pizza express', 'waitrose', 'simply food', 'co-op', 'morrisons local', 'canteen', 'banbury rail', 'leon', 'tesco', 'beyond bread', 'abokado'],
        travel: ['uber bv', 'thames clippers', 'tfl.gov', 'chiltern'],
        booze: ['horse and jockey', 'ye olde reindeer', 'easington', 'm/bone stn gb', 'pinto'],
        entertainment: ['itunes.com', 'paypal', 'blizzard', 'netflix.com', 'amazon'],
        expenses: ['uber bv', 'freshbooks', 'github', 'google']
    };

    $scope.tags = {
        food: 0,
        travel: 0,
        booze: 0,
        entertainment: 0,
        expenses: 0
    };

    $scope.md = '';
    $scope.search = '';

    // Would you look at the fucking state of this.
    function scan() {
        for ( var v in $scope.data.data ) {
            for ( var x in $scope.categories ) {
                for ( var f in $scope.categories[x] ) {
                    if ( $scope.data.data[v] && $scope.data.data[v].Description ) {
                        if ( $scope.data.data[v].Description.toLowerCase().indexOf($scope.categories[x][f]) ) {
                            $scope.tags[x] += parseInt($scope.data.data[v].Value, 10);
                        }
                    }
                }
            }
        }
    };

    // WAHEY
    $timeout(function() {

        var dangerzone = document.getElementById('dangerzone');

        dangerzone.ondragover = function() {
            return false;
        };
        dangerzone.ondragend = function() {
            return false;
        };
        dangerzone.ondrop = function(e) {
            e.preventDefault();

            var file = e.dataTransfer.files[0],
                reader = new FileReader();

            reader.onload = function(event) {
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.data = Papa.parse(event.target.result, {
                            header: true
                        });
                        scan();
                        $scope.dropped = true;
                    });
                });
            };

            reader.readAsText(file);
            return false;
        };
    });
}];
