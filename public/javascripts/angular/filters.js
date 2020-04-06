'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$filter */

var filters = angular.module('practitionerPortal.filters', []);
filters.filter('filterByArray', function() {
    return function(input, filterArray) {
        if(input)
            var output = input.slice();
        else
            output = []
        for(var p = 0; p < output.length; p++){
            for(var i in filterArray){
                if(filterArray[i] != 'all' && filterArray[i] != 'none'){
                if(JSON.stringify(output[p]) != undefined){
                    if(typeof(filterArray[i]) != "function" && JSON.stringify(output[p].tags).toLowerCase().indexOf(filterArray[i].toLowerCase()) == -1){
                        output.remove(p)
                        p = -1;
                    }
                }
                }
            }
        }
        return output;
    };
});

filters.filter('typeaheadHighlight', function() {
    return function(matchItem, query) {
        return (query) ? matchItem.replace(new RegExp(query, 'gi'), '<strong>$&</strong>') : query;
    };
});