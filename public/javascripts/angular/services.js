'use strict';


// Demonstrate how to register services
// In this case it is a simple constant service.

var services = angular.module('practitionerPortal.services', ['ngResource']).
    value('version', '0.1');

services.factory('practitionerData', function($rootScope) {
    var practitionerData = {};

    practitionerData.data = {};

    practitionerData.prepForBroadcast = function(data) {
        this.data = data;
        this.broadcastItem();
    };

    practitionerData.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return practitionerData;
});



services.factory("ListResource", ['$resource', function($resource) {
    return $resource('/api/exerciselist/:exerciseListId', {
        exerciseListId:'@exerciseListId'
    })
}]);

services.factory('analytics', function(){
    var analytics = analytics || [];

// Define a method that will asynchronously load analytics.js from our CDN.
    analytics.load = function(apiKey) {

        // Create an async script element for analytics.js.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') +
            'd2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/' + apiKey + '/analytics.js';

        // Find the first script element on the page and insert our script next to it.
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);

        // Define a factory that generates wrapper methods to push arrays of
        // arguments onto our `analytics` queue, where the first element of the arrays
        // is always the name of the analytics.js method itself (eg. `track`).
        var methodFactory = function (type) {
            return function () {
                analytics.push([type].concat(Array.prototype.slice.call(arguments, 0)));
            };
        };

        // Loop through analytics.js' methods and generate a wrapper method for each.
        var methods = ['identify', 'track', 'trackLink', 'trackForm', 'trackClick',
            'trackSubmit', 'pageview', 'ab', 'alias', 'ready'];
        for (var i = 0; i < methods.length; i++) {
            analytics[methods[i]] = methodFactory(methods[i]);
        }
    };

// Load analytics.js with your API key, which will automatically load all of the
// analytics integrations you've turned on for your account. Boosh!
    analytics.load('aq5kapao5v');
    return analytics;
})

services.factory("authicSubdomain", ['$resource', function($resource) {
    return $resource('/config/subdomain', {});
}]);

services.factory("userResource", ['$resource', function($resource) {
    return $resource('/user/patient/:userId', {
        userId:'@id'
    })
}]);

services.factory("exerciseListByUserResource", ['$resource', function($resource) {
    return $resource('/user/:userId/exerciseList/:exerciseListId', {
        userId:'@userId', exerciseListId:'@exerciseListId'
    })
}]);


services.factory("exerciseListResource", ['$resource', function($resource) {
    return $resource('/api/exerciselist/:id', {
        id:'@id'
    })
}]);


services.factory('getBtnClass', function(){
    return function(exercise){
        if (exercise.active){
            return "active";
        }
        else{
            return "";
        }
    }
})

services.factory('getExerciseClass', function(){
    return function (exercise) {

        if (angular.isDefined(exercise) && angular.isDefined(exercise.thumbnail)) {
            var split = exercise.thumbnail.split('/');
            var val = split[4].split('.')
            return 'exercise-' + val[0];
        }
        else{
             return ''
        }
    }
})

services.factory('getExerciseSearch', function(){
    return function(search){
        if (search[0] == 'all'){
            delete search[0];
        }

        var string = search[0];
        var after = "";

        for (var i in search){
            var curr = search[i];
            if (typeof curr != 'string'){
                break;
            }
            if (curr == "Stretch" || curr == "Strengthen"){
                after = curr.toLowerCase()+"ing ";
            }
            else if (curr != 'all'){
                string = curr.toLowerCase();
            }
        }

        return "all "+ string + " " + after + "exercises.";
    }
})

services.factory('selectExercise', function(){
    return function(exercises, exercise){
        exercise.selected = !exercise.selected
        if (!exercises) {
            exercises = []
        }
        if (exercise.selected) {
            exercises.push(exercise);
        }
        else {
            exercises.remove(exercises.indexOf(exercise));
        }
        return exercises
    }
})

services.factory('showPrescribed', function(){
    return function (exercise) {
        if (JSON.stringify(exercise.prescriptionData).indexOf('Comments')) {
            if (exercise.prescriptionData.length > 1) {
                return true
            }
            else {
                return false
            }
        }
        else {
            if (exercise.prescriptionData.length > 0) {
                return true
            }
            else {
                return false
            }
        }
    }
})

services.factory('showComments', function(){
    return function (exercise) {
        for (var i in exercise.prescriptionData) {
            if (exercise.prescriptionData[i].name == 'Comments') {
                if (!exercise.prescriptionData[i].value) {
                    return false;
                }
            }
        }
        return true;
    }
})

services.factory('flip', function(){
    return function(search, callback){
        if (search.indexOf('Anterior') != -1) {
            search.remove(search.indexOf('Anterior'))
            search.push("Posterior")
            var backOrFront = "Posterior";
            if (search.indexOf('chest') != -1) {
                search.remove(search.indexOf('chest'))
                search.push("back")
            } else if (search.indexOf('abdomen') != -1) {
                search.remove(search.indexOf('abdomen'))
                search.push("gluets")
            }
        } else {
            if (search.indexOf('Posterior') != -1) {
                search.remove(search.indexOf('Posterior'))
                if (search.indexOf('back') != -1) {
                    search.remove(search.indexOf('back'))
                    search.push("chest")
                } else if (search.indexOf('gluets') != -1) {
                    search.remove(search.indexOf('gluets'))
                    search.push("abdomen")
                }
            }
            search.push("Anterior")
            backOrFront = "Anterior";
        }
       callback(search, backOrFront)
    }
})

services.factory('formValidate', function(){
    return function(exerciseList){
        if (!exerciseList) {
            return true;
        }
        if (!exerciseList.name)
            return true;
        return false;
    }
})

services.factory("templateListResource", ['$resource', function($resource) {
    return $resource("/api/templatelist")
}]);

services.factory('typeaheadParser', ['$parse', function ($parse) {

    //                      00000111000000000000022200000000000000003333333333333330000000000044000
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

    return {
        parse:function (input) {

            var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
            if (!match) {
                throw new Error(
                    "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
                        " but got '" + input + "'.");
            }

            return {
                itemName:match[3],
                source:$parse(match[4]),
                viewMapper:$parse(match[2] || match[1]),
                modelMapper:$parse(match[1])
            };
        }
    };
}])

services.factory("templateResource", ['$resource', function($resource) {
    return $resource("/api/template/:id", {id: '@id'})
}]);

services.factory("exerciseResource", ['$resource', function($resource) {
    return $resource('/exercise/:exerciseId', {
        exerciseId:'@exerciseId'
    })
}]);

services.factory("exerciseCustomResource", ['$resource', function($resource) {
    return {
        getExerciseByUserId: $resource('/exercise/custom/:userId', {userId:'@userId'}, {
            query: { method: 'GET', params: {}, isArray: false }
        }),
        saveExercise: $resource('/exercise', {
            id:'@id',
            name: '@name',
            videoMp4: '@videoMp4',
            thumbnail: '@thumbnail',
            description: '@description',
            createdAt: '@createdAt',
            updatedAt: '@updatedAt',
            userId:'@userId'
        }, {
            query: { method: 'POST', params: {}, isArray: false }
        }),
        getAllTags : $resource('/tag', {}, {
            query: { method: 'GET', params: {}, isArray: false }
        }),
        setExerciseTags : $resource('/exercise/addTags', {
            exerciseId: '@exerciseId',
            tags : '@tags'
        }, {
            query: { method: 'POST', params: {}, isArray: false }
        }),
        getAllPrescriptions : $resource('/prescription', {}, {
            query: { method: 'GET', params: {}, isArray: false }
        }),
        setExercisePrescriptionInfoes : $resource('/exercise/addExercisePrescriptionInfoes', {
            exerciseId: '@exerciseId',
            prescriptionInfoes: '@prescriptionInfoes'
        }, {
            query: { method: 'POST', params: {}, isArray: false }
        })
    };
}]);

services.factory("tour",  function($rootScope) {
    var tour = new Tour();
    tour.shouldRun = false;

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop1",
        content: "<h3>Browse and Filter Exercises</h3><p>Choose between stretch and strength or filter by body part by clicking on the diagram.</p>",
        placement: "right",
        path: "/",
        controller: "ExerciseProgramCntl"
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop2",
        content: "<h3>Adding exercises to a program</h3><p>Click the "+" button to add that exercise to a new program direct from the exercise list.</p>",
        placement: "top",
        path: "/",
        controller: "ExerciseProgramCntl"
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop3",
        content: "<h3>View and build templates</h3><p>Here you'll find exercise templates, make your own or use the ones we created to get your started quickly.</p>",
        placement: "bottom",
        path: "/",
        controller: "ExerciseProgramCntl"
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop4",
        content: "<h3> Add new patient quickly.</h3><p>Press this button and enter the basic details required to add a new patient. You can always go back and add more.</p>",
        placement: "bottom",
        path: "/",
        controller: "ExerciseProgramCntl"
    })

    tour.broadcastItem = function() {
        $rootScope.$broadcast('tourBroadcast');
    };

    tour.prepForBroadcast = function() {
        tour.broadcastItem();
    };

    return tour;
});

services.factory("tabletTour",  function($rootScope) {
    var tour = new Tour({
        onEnd: function(tour){
            $rootScope.$broadcast('menuBroadcast', 'hide');
        }
    });
    tour.shouldRun = false;

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop1",
        content: "<h3>Browse and Filter Exercises</h3><p>Choose between stretch and strength or filter by body part by touching the list to the left.</p>",
        placement: "right",
        path: "/",
        onShow: function(t){
            $rootScope.$broadcast('menuBroadcast', "hide");
        }
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop2",
        content: "<h3>Adding exercises to a program</h3><p>Click the "+" button to add that exercise to a new program direct from the exercise list.</p>",
        placement: "top",
        path: "/",
        onShow: function(t){
            $rootScope.$broadcast('menuBroadcast', "hide");
        }
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop3",
        content: "<h3>View and build templates</h3><p>Here you'll find exercise templates, make your own or use the ones we created to get your started quickly.</p>",
        placement: "right",
        path: "/",
        onShow: function(t){
            $rootScope.$broadcast('menuBroadcast', "show");
        }
    })

    tour.addStep({
        title: "TOUR TIP",
        element: "#stop4",
        content: "<h3> Add new patient quickly.</h3><p>Tap this button and enter the basic details required to add a new patient. You can always go back and add more.</p>",
        placement: "right",
        path: "/",
        onShow: function(t){
            $rootScope.$broadcast('menuBroadcast', "show");
        }
    })

    tour.broadcastItem = function() {
        $rootScope.$broadcast('tourBroadcast');
    };

    tour.prepForBroadcast = function() {
        tour.broadcastItem();
    };

    return tour;
});


services.factory("practitionerResource", ['$resource', function($resource) {
    return $resource('/user/self')
}]);

services.factory('navData', function($rootScope) {
    var navData = {};

    navData.data = '';

    navData.prepForBroadcast = function(data) {
        this.data = data;
        this.broadcastItem();
    };

    navData.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcastNav');
    };

    return navData;
});
