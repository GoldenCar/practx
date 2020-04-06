'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$compileProvider.directive */
var directives = angular.module('practitionerPortal.directives', []);

directives.directive('activenav', function($parse) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.selection, function(value) {
            $('.nav').children().removeClass('active');
            $('#'+value).addClass('active');
        });
    };
});

directives.directive('autocomplete', function($parse) {
    return function(scope, element, attrs) {
        var setSelection = $parse(attrs.selection).assign;
        scope.$watch(attrs.autocomplete, function(value) {
            element.autocomplete({
                source: value,
                select: function(event, ui) {
                    setSelection(scope, ui.item.value);
                    scope.$apply();
                }
            });
        });
    };
});